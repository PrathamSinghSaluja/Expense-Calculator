import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils'

function BudgetCard({ name, amount, max, gray, onAddExpenseClick, hideButton, onViewExpenseClick }) {

    const classNames = []

    if(amount > max){
        classNames.push("bg-danger", "ng-opacity-10")
    }
    else if(gray){
        classNames.push("bg-light")
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                        <div className='me-2'>{name}</div>
                        <div className='d-flex align-items-baseline'>
                            {currencyFormatter.format(amount)} 
                            {max && <span className='text-muted fs-6 ms-1'> 
                                / {currencyFormatter.format(max)}</span> }
                                </div>
                    </Card.Title>
                    { max && <ProgressBar 
                        className='rounded-pill' 
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
                    />}

                    { !hideButton && <Stack direction='horizontal' gap="2" className='mt-4'>
                        <Button variant='outline-primary' className='ms-uto' onClick={onAddExpenseClick}>Add Expense</Button>
                        <Button variant='outline-secondary' onClick={onViewExpenseClick}>View Expenses</Button>
                    </Stack>}
                </Card.Body>
            </Card>
        </div>
    )
}


function getProgressBarVariant(amount, max){
    const ratio = amount / max
    if(ratio < 0.5) return "primary"
    if(ratio < 0.75) return "warning"
    return "danger"
}

export default BudgetCard
