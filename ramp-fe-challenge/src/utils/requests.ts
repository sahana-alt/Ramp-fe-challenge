import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"
import { start } from "repl";

const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  const start = 0
  const end = page*TRANSACTIONS_PER_PAGE + TRANSACTIONS_PER_PAGE

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }

  if(end>= data.transactions.length){

    const viewMoreButton = document.querySelector('.RampButton') as HTMLButtonElement
    if (viewMoreButton){
        viewMoreButton.style.display = "none"
    }
   
  
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}


export const getTransactionsPageSize = ({
  pageSize}: {pageSize: number}): PaginatedResponse<Transaction[]> => {
  if (pageSize === null) {
    throw new Error("Page cannot be null")
  }

  const start = 0
  const end = pageSize

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${pageSize}`)
  }

 

  return {
    nextPage:0,
    data: data.transactions.slice(start, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }
   
  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}
  
export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )

  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }

  transaction.approved = value
}
