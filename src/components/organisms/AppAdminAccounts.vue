<script setup lang="ts">
import { getAllAccounts } from '@/services/adminService'
import type { PopupStyle, User } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import AppLoading from '../atoms/AppLoading.vue'
import AppButton from '../atoms/AppButton.vue'
import { ref } from 'vue'
import AppInput from '../atoms/AppInput.vue'
import AppOptions from '@/components/atoms/AppOptions.vue'
import { useDateFormater } from '@/composables/dateFormater'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['accounts'],
  queryFn: getAllAccounts<{ data: User[] }>
})

const searchValue = ref<string>('')

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
        <AppInput type="text" name="searchValue" v-model="searchValue"></AppInput>
        <AppButton>Search</AppButton>
      </div>

      <div class="roles">
        <span>Roles:</span>
        <div class="role-btns">
          <AppButton>Super admin</AppButton>
          <AppButton>Admin</AppButton>
          <AppButton>User</AppButton>
        </div>
      </div>
    </div>

    <table class="account-table">
      <thead>
        <tr>
          <th>id</th>
          <th>firstname</th>
          <th>lastname</th>
          <th>email</th>
          <th>role</th>
          <th>created_at</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="account" v-for="account in data?.data.data" :key="account.id">
          <td>{{ account.id }}</td>
          <td>{{ account.firstname }}</td>
          <td>{{ account.lastname }}</td>
          <td>{{ account.email }}</td>
          <td>{{ account.role }}</td>
          <td>{{ useDateFormater(account.created_at).newDate }}</td>
          <td>
            <i class="fa-solid fa-ellipsis-vertical options" @click="openMore(account)"></i>
          </td>
        </tr>
        <AppOptions
          v-if="showOptions && selectedAccount"
          :visible="showOptions"
          :account="selectedAccount"
        ></AppOptions>
      </tbody>
    </table>
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
    gap: 1rem;

    .search {
      display: flex;
      flex-flow: column;
      width: 30%;
      gap: 0.5rem;
    }

    .roles {
      display: flex;
      flex-flow: row;
      align-items: center;
      gap: 0.5rem;

      .role-btns {
        display: flex;
        flex-flow: row;
        gap: 1rem;
      }
    }
  }

  .account-table {
    border: 2px solid var(--main-light);
    border-collapse: collapse;
    text-align: center;

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

.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
</style>
