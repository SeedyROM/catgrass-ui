import { getTaskHash } from "@/utils/taskHelpers";
import type { Task } from "@/utils/types";
import { appConfig } from '@/utils/constants'
import { junoswap, junoswapPools } from '@/utils/junoswap'
import { fromMicroDenom } from "@/utils/helpers";

export const recipeData = {
  mainnet: [],
  testnet: [
    // NOTE: Junoswap paused for WYND migration :(
    // {
    //   task: { // DCA
    //     "actions": [
    //       {
    //         "msg": {
    //           "wasm": {
    //             "execute": {
    //               "contract_addr": "juno18nhxas6yzzef3agczvfr62303enemkl8m84rlhur6q920rzarg5q3dn2fd",
    //               "msg": "eyJzd2FwX2FuZF9zZW5kX3RvIjp7ImlucHV0X3Rva2VuIjoiVG9rZW4xIiwiaW5wdXRfYW1vdW50IjoiMTAwMDAwMCIsIm1pbl90b2tlbiI6IjAiLCJyZWNpcGllbnQiOiJqdW5vMXFsbXdqa2c3dXU0YXdhanc1YXVuY3RqZGNlOXE2NTdqMHJyZHB5In19",
    //               "funds": [
    //                 {
    //                   "amount": "1000000",
    //                   "denom": "ujunox"
    //                 }
    //               ]
    //             }
    //           }
    //         },
    //         "gas_limit": 255499
    //       }
    //     ],
    //     "boundary": {
    //       "Height": {
    //         "start": "1304321",
    //         "end": "1314321"
    //       }
    //     },
    //     "cw20_coins": [],
    //     "interval": {
    //       "Block": 1000
    //     },
    //     "queries": [
    //       {
    //         "query": {
    //           "contract_addr": "juno18nhxas6yzzef3agczvfr62303enemkl8m84rlhur6q920rzarg5q3dn2fd",
    //           "msg": "eyJ0b2tlbjFfZm9yX3Rva2VuMl9wcmljZSI6eyJ0b2tlbjFfYW1vdW50IjoiMTAwMDAwMCJ9fQ=="
    //         }
    //       }
    //     ],
    //     "transforms": [
    //       {
    //         "action_idx": 0,
    //         "query_idx": 0,
    //         "action_path": [
    //           {
    //             "key": "swap_and_send_to"
    //           },
    //           {
    //             "key": "min_token"
    //           }
    //         ],
    //         "query_response_path": [
    //           {
    //             "key": "token2_amount"
    //           }
    //         ]
    //       }
    //     ],
    //     "stop_on_fail": false
    //   }
    // },
    {
      task: { // Payrolls
        "actions": [
          {
            "msg": {
              "bank": {
                "send": {
                  "to_address": "juno18nhxas6yzzef3agczvfr62303enemkl8m84rlhur6q920rzarg5q3dn2fd",
                  "amount": [
                    {
                      "amount": "1000000",
                      "denom": "ujunox"
                    }
                  ]
                }
              }
            },
            "gas_limit": 62116
          },
          {
            "msg": {
              "bank": {
                "send": {
                  "to_address": "juno18nhxas6yzzef3agczvfr62303enemkl8m84rlhur6q920rzarg5q3dn2fd",
                  "amount": [
                    {
                      "amount": "1000000",
                      "denom": "uneta"
                    }
                  ]
                }
              }
            },
            "gas_limit": 62116
          }
        ],
        "boundary": null,
        "cw20_coins": [],
        "interval": {
          "Block": 1200
        },
        "queries": null,
        "transforms": null,
        "stop_on_fail": false
      }
    },
    {
      task: { // Custom Message
        "actions": [
          {
            "msg": {
              "wasm": {
                "execute": {
                  "contract_addr": "juno18nhxas6yzzef3agczvfr62303enemkl8m84rlhur6q920rzarg5q3dn2fd",
                  "msg": {
                    "do_thing": {
                      "example": "YOUR THINGS HERE"
                    }
                  },
                  "funds": [
                    {
                      "amount": "1000000",
                      "denom": "ujunox"
                    }
                  ]
                }
              }
            },
            "gas_limit": null
          }
        ],
        "boundary": {
          "Height": {
            "start": "1304359"
          }
        },
        "cw20_coins": [],
        "interval": "Immediate",
        "queries": [
          {
            "contract_addr": "COSMWASM_CONTRACT_ADDRESS HERE",
            "msg": {
              "example": "YOUR QUERY HERE"
            },
            "res_query_value": [
              {
                "key": "admin"
              }
            ],
            "ordering": "unit_above",
            "value": "500"
          }
        ],
        "transforms": [
          {
            "kind": "Action",
            "req_idx": 1,
            "res_idx": 0,
            "req_path": [
              {
                "key": "transfer"
              },
              {
                "key": "amount"
              }
            ],
            "res_path": [
              {
                "key": "admin"
              }
            ]
          }
        ],
        "stop_on_fail": false
      }
    },
  ],
};

export const recipes = (type: string) => recipeData[type];

export const computeTitle = (task: Task, occurs: number): string => {
  let title = ''
  let coreType = 'custom'
  let context: any = { paymentAssets: [] }

  // NOTE: This only works for the last action, needs to consider all and use "THEN" statements for context changes
  task.actions.forEach((a: any) => {
    // All the boring interval boundary shtuff
    context.times = `time${occurs != 1 ? 's' : ''}`
    context.startStr = '' // `, starting at block 123,456`
    context.endStr = '' // `, ending at block 123,656`

    // TODO: Consider query context: if balance lower than X

    if ('wasm' in a.msg) {
      const m = a.msg.wasm.execute.msg

      // TODO: Migrate to WYND once launched
      // TODO: If known app, add to the recipeNetworks chain for contextual app UI icon
      // DCA Criteria: actions have swap, interval is GT 1
      if (occurs > 0 && Object.keys(m).join('').search('swap') > -1) {
        coreType = 'dca'
        // TODO: Setup way better support for other networks
        const chainName = appConfig.networkType === 'testnet' ? 'junotestnet' : 'juno'
        const pool = junoswap.getPoolByContractAddr(junoswapPools[chainName], a.msg.wasm.execute.contract_addr)
        context.assetA = `${pool.pool_assets[0].symbol}`.toUpperCase()
        context.assetB = `${pool.pool_assets[1].symbol}`.toUpperCase()
      }
    }

    // NOTE: This only works for native tokens
    if ('bank' in a.msg) {
      // Payroll Criteria: actions have 1 or more bank send
      coreType = 'payroll'
      const amount = a.msg.bank.send.amount
      const assets = amount.map(a => {
        const r = `${fromMicroDenom(a.denom)}`.toUpperCase()

        if (!context.paymentAssets.includes(r)) return `$${r}`
        return ''
      }) //`$JUNO, $NETA`
      context.paymentAssets = context.paymentAssets.length > 0 ? context.paymentAssets.concat(assets) : assets
      context.totalRecipients = typeof context.totalRecipients !== 'undefined' ? context.totalRecipients + 1 : 1
    }
  })

  switch (coreType) {
    case 'custom':
      const queries = task.queries ? `${task.queries.length == 1 ? '1 query,' : task.queries.length + ' queries,'}` : ''
      const transforms = task.transforms ? `${task.transforms.length == 1 ? ' 1 transform,' : task.transforms.length + ' transforms,'}` : ''
      const actions = `${task.actions.length == 1 ? '1 action' : task.actions.length + ' actions'}`
      title = `Custom task with ${queries}${transforms} and ${actions}`
      break;
    case 'dca':
      title = `Dollar Cost Average from $${context.assetA} to $${context.assetB}${context.startStr}${context.endStr}`
      break;
    case 'payroll':
      const recipients = `recipient${context.totalRecipients != 1 ? 's' : ''}`
      title = `Send ${context.paymentAssets.join(' & ')} tokens to ${context.totalRecipients} ${recipients} ${occurs} ${context.times}${context.startStr}${context.endStr}`
      break;
    default:
      break;
  }

  // Default: Custom Message
  return title
}

export const computeBgColor = (task: Task): string => {
  // Color based on task_hash?
  const task_hash = getTaskHash(task)
  // NOTE: Apparently the sha256 variability based on the input has the best difference and 
  // non-pollutive color range as defined below. #wowwwwww
  if (task_hash) return `#${task_hash.substring(task_hash.length - 21, task_hash.length - 15)}`

  return 'rgb(219 39 119 / var(--tw-bg-opacity))'
}