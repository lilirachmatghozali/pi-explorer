import {compose} from 'recompose'
import {server as stellar} from '../lib/Stellar'
import {withPaging} from './shared/Paging'
import {withDataFetchingContainer} from './shared/TableContainer'
import {isDefInt, isAccount} from '../lib/Utils'
import TransactionTable from './TransactionTable'

const rspRecsToProps = (records) => {
  return records.map((rspRec) => {
    const rec = {
      hash: rspRec.hash,
      ledger: rspRec.ledger_attr,
      opCount: rspRec.operation_count,
      time: rspRec.created_at
    }
    return rec
  })
}

const fetchRecords = (props) => {
  const builder = stellar.transactions()
  if (isDefInt(props, 'ledger'))
    builder.forLedger(props.ledger)
  if (isAccount(props.account))
    builder.forAccount(props.account)
  builder.limit(props.limit)
  builder.order('desc')
  return builder.call()
}

const enhance = compose(withPaging(), withDataFetchingContainer(fetchRecords, rspRecsToProps))
export default enhance(TransactionTable)