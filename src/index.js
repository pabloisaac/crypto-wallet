import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import '../global';
import Header from './screens/Header';
import Balance from './screens/Balance';
import History from './screens/History';
import { getBalance, getTransactionsByAccount } from './services/web3'
import * as Constants from './utils/constants';


const App = () => {
  const [balance, setBalance] = useState(undefined)
  const [spinnerBalance, setSpinnerBalance] = useState(true)
  const [listTransactions, setListTransactions] = useState([])
  const [spinnerHistory, setSpinnerHistory] = useState(true)


  useEffect(() => {
    (async () => {
      await getBalanceByAccount()
      await getListHashs()
    })();
  }, [])

  const getBalanceByAccount = async () => {
    let response = await getBalance(Constants.ACCOUNT)
    setBalance(response)
    setSpinnerBalance(false)
  }

  const getListHashs = async () => {
    let response = await getTransactionsByAccount(Constants.ACCOUNT, null, null)
    if(response.data.status === "1"){
      setListTransactions(response.data.result.reverse())
    } else {
      setListTransactions([])
    }
    setSpinnerHistory(false)
}

  return (
    <View style={styles.container}>
      <Header/>
      <Balance balance={balance} spinnerBalance={spinnerBalance}/>
      <History listTransactions={listTransactions} spinnerHistory={spinnerHistory}/>
    </View>
  )

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
