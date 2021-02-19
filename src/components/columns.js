import { format } from 'date-fns';

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    }
]

const onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
        }
    }
}