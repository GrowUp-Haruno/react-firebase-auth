import {FC} from 'react'
import Card from '../atoms/Card'

//Propsの型定義
// type PropsType = {
  
// }

const Loading: FC = () => {
  return (
    <Card>
      <h1>Loading</h1>
    </Card>
  ) 
}

Loading.displayName = 'Loading'
export default Loading