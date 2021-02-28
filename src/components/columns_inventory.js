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
        Header: 'Reagent Name',
        accessor: 'reagent_name',
        canGroupBy: false,
        aggregate: topValue,
        disableSortBy: true
    },
    {
        Header: 'LOT Number',
        id: 'lot_nr',
        accessor: 'lot_number',
        canGroupBy: true,
        disableSortBy: true,
        aggregate: topValue,
    },
    {
        Header: 'CAT Number',
        accessor: 'cat_number',
        canGroupBy: false,
        aggregate: topValue
    },
    {
        Header: 'Date Received',
        id: 'date_rc',
        accessor: 'date_received',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Expiry Date',
        accessor: 'expiry_date',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Supplier',
        accessor: 'supplier',
        disableSortBy: true,
        aggregate: topValue,
        canGroupBy: true
    },
    {
        Header: 'Date of First Use',
        accessor: 'date_of_use',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Last Used By',
        accessor: 'last_used',
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Assay',
        accessor: 'assay',
        canGroupBy: false,
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