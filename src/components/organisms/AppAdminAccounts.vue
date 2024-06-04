<script setup lang="ts">
import { getAllAccounts } from '@/services/adminService'
import type { GetAccountsPayload, User } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AppLoading from '../atoms/AppLoading.vue'
import AppButton from '../atoms/AppButton.vue'
import { ref, watchEffect } from 'vue'
import AppInput from '../atoms/AppInput.vue'
import AppOptions from '@/components/atoms/AppOptions.vue'
import { useDateFormater } from '@/composables/dateFormater'
import { useAuthStore } from '@/stores/auth'

const queryClient = useQueryClient()

const getPayload = ref<GetAccountsPayload>({})

const { isPending, isError, data, error } = useQuery({
  queryKey: ['accounts'],
  queryFn: () => getAllAccounts<{ data: User[] }>(getPayload.value)
})

const searchValue = ref<string>('')
const selectedRole = ref<number>(0)

const setSelectedRole = (role: number) => {
  selectedRole.value = role
  getPayload.value.role_id = role
  queryClient.invalidateQueries({ queryKey: ['accounts'] })
}
const setSearchValue = () => {
  getPayload.value.term = searchValue.value
  queryClient.invalidateQueries({ queryKey: ['accounts'] })
}

const showOptions = ref<boolean>(false)
const selectedAccount = ref<User | null>(null)

const openMore = (account: User) => {
  selectedAccount.value = account
  showOptions.value = true
}

const closeOptions = () => {
  showOptions.value = false
}

window.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.account-options') && !target.closest('.fa-ellipsis-vertical')) {
    closeOptions()
  }
})

watchEffect(() => {
  if (searchValue.value === '') {
    console.log('Refetching accounts')
    getPayload.value.term = ''
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
  }
})
</script>

<template>
  <h1>Accounts</h1>

  <div class="error" v-if="isPending">
    <h1>Loading accounts...</h1>
    <AppLoading></AppLoading>
  </div>

  <div class="error" v-if="isError">
    <h1>Something went wrong! Try again later...</h1>
    <p>{{ error }}</p>
  </div>

  <div class="accounts" v-if="!isPending && !isError">
    <div class="filters">
      <div class="search">
        <label for="searchValue">Search users</label>
        <AppInput
          type="text"
          id="searchValue"
          name="searchValue"
          v-model:value="searchValue"
        ></AppInput>

        <AppButton @click="setSearchValue()">Search</AppButton>
      </div>

      <div class="roles">
        <span>Roles:</span>
        <div class="role-btns">
          <button :class="{ selected: selectedRole === 1 }" @click="setSelectedRole(1)">
            Super admin
          </button>
          <button :class="{ selected: selectedRole === 2 }" @click="setSelectedRole(2)">
            Admin
          </button>
          <button :class="{ selected: selectedRole === 3 }" @click="setSelectedRole(3)">
            User
          </button>
          <button class="btn-reset" @click="setSelectedRole(0)">
            <i class="fa-solid fa-ban"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="account-table">
        <thead>
          <tr>
            <th>id</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>role</th>
            <th>created_at</th>
            <th v-if="useAuthStore().isSuperAdmin">action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="isPending">
            <td colspan="7">Loading accounts...</td>
          </tr>
          <tr class="account" v-for="account in data?.data.data" :key="account.id">
            <td>{{ account.id }}</td>
            <td>{{ account.firstname }}</td>
            <td>{{ account.lastname }}</td>
            <td>{{ account.email }}</td>
            <td>{{ account.role }}</td>
            <td>{{ useDateFormater(account.created_at).newDate }}</td>
            <td v-if="useAuthStore().isSuperAdmin">
              <i class="fa-solid fa-ellipsis-vertical options" @click="openMore(account)"></i>
            </td>
          </tr>
          <tr v-if="!data?.data.data.length">
            <td scope="row" colspan="7">No accounts found</td>
          </tr>
          <AppOptions
            v-if="showOptions && selectedAccount"
            :visible="showOptions"
            :account="selectedAccount"
          ></AppOptions>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accounts {
  display: flex;
  flex-flow: column;
  gap: 1rem;

  .filters {
    display: flex;
    flex-flow: column;
    gap: 1.5rem;

    .search {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      gap: 0.5rem;

      > div {
        display: flex;
        flex-flow: column;
        width: 80%;
      }

      button {
        height: fit-content;
        width: 10rem;
        padding: 0.75rem auto;
      }
    }

    .roles {
      display: flex;
      flex-flow: column;
      align-items: left;
      gap: 0.5rem;

      .role-btns {
        display: flex;
        flex-flow: row wrap;
        gap: 0.5rem;
        width: 100%;

        button {
          border: 2px solid var(--secondary);
          padding: 0.7rem;
          flex: 3;
          min-width: 5rem;

          &:hover {
            background-color: var(--main-light);
            cursor: pointer;
          }
        }

        .btn-reset {
          flex: 1;
          padding: 1rem 0;
          width: fit-content;
        }

        .selected {
          color: var(--bg);
          background-color: var(--main);

          &:hover {
            color: var(--bg);
            background-color: var(--main);
          }
        }
      }
    }
  }

  .table-container {
    overflow-x: auto;
    width: 100%;

    .account-table {
      border: 2px solid var(--main-light);
      text-align: center;
      min-width: max-content;
      border-collapse: collapse;

      tr {
        height: 2.5em;

        th {
          border-right: 1px solid var(--bg);
        }
      }

      thead {
        background-color: var(--main-light);

        th {
          text-transform: uppercase;
        }
      }

      tbody {
        position: relative;

        tr {
          border-bottom: 1px solid var(--main-light);

          .options {
            padding: 0.5rem;

            &:hover {
              background-color: var(--main-light);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}

@media (min-width: 45em) {
  .accounts {
    .filters {
      width: 80%;

      .search {
        input[type='text'] {
          max-width: 40rem;
        }
      }

      .roles {
        display: flex;
        flex-flow: column;
        align-items: left;
        gap: 0.5rem;

        .role-btns {
          display: flex;
          flex-flow: row wrap;
          gap: 0.5rem;
          width: 100%;

          button {
            border: 2px solid var(--secondary);
            padding: 0.7rem;
            flex: 3;
            min-width: 5rem;
            max-width: 8rem;

            &:hover {
              background-color: var(--main-light);
              cursor: pointer;
            }
          }

          .btn-reset {
            flex: 1;
            padding: 1rem 0;
            width: fit-content;
          }

          .selected {
            color: var(--bg);
            background-color: var(--main);

            &:hover {
              color: var(--bg);
              background-color: var(--main);
            }
          }
        }
      }
    }

    .table-container {
      overflow-x: auto;
      width: 100%;

      .account-table {
        border: 2px solid var(--main-light);
        text-align: center;
        width: 100%;
        min-width: max-content;
        border-collapse: collapse;

        tr {
          height: 2.5em;

          th {
            border-right: 1px solid var(--bg);
          }
        }

        thead {
          background-color: var(--main-light);

          th {
            text-transform: uppercase;
          }
        }

        tbody {
          position: relative;

          tr {
            border-bottom: 1px solid var(--main-light);

            .options {
              padding: 0.5rem;

              &:hover {
                background-color: var(--main-light);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
