import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import './App.css';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import BudgetCard from './Components/BudgetCard'
import TotalBudgetCard from './Components/TotalBudgetCard';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import ViewExpenseModal from './Components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
    <Container>
      <Stack direction='horizontal' gap="2" className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>

      <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: '1rem', alignItems: 'flex-start'}}>
        {budgets.map(budget => {
          const amount  = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount, 0
          )
          return(
          <BudgetCard 
            name={budget.name}
            key={budget.id} 
            amount={amount} 
            max={budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
          />
          )
        })}
        <UncategorizedBudgetCard onAddExpenseClick= {openAddExpenseModal}   onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
        <TotalBudgetCard />
      </div>
    </Container>
    <AddBudgetModal 
      show={showAddBudgetModal} 
      handleClose={() => setShowAddBudgetModal(false)}
    />
    <AddExpenseModal 
      show={showAddExpenseModal} 
      defaultBudgetId={addExpenseModalBudgetId} 
      handleClose={() => setShowAddExpenseModal(false)}
    />

    <ViewExpenseModal 
      budgetId={viewExpenseModalBudgetId} 
      defaultBudgetId={addExpenseModalBudgetId} 
      handleClose={() => setViewExpenseModalBudgetId()}
    />
    </>
  );
}

export default App;
