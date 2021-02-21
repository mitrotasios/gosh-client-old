import { format } from 'date-fns';
import {BiRightArrow, BiDownArrow} from 'react-icons/bi'

export const COLUMNS = [
    /*
    {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <BiDownArrow/> : <BiRightArrow/>}
          </span>
        ),
    },
    */
    {
        Header: 'Id',
        accessor: 'id',
        canGroupBy: false,
        aggregate: topValue,
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
        canGroupBy: false,
        aggregate: topValue,
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
        canGroupBy: false,
        aggregate: topValue
    },
    {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        aggregate: topValue,
        //Aggregated: ({})
        //canGroupBy: false
    },
    {
         Header: 'Country',
         accessor: 'country',
         disableSortBy: true

    },
    {
        Header: 'Phone',
        accessor: 'phone',
        canGroupBy: false,
        aggregate: topValue
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

function topValue(leafValues) {
    let top = leafValues[0]
  
    /*
    leafValues.forEach(value => {
      min = Math.min(min, value)
      max = Math.max(max, value)
    })
    */
  
    return top
  }