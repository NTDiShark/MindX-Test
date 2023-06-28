
import { useState } from 'react';
import { Button, Checkbox, Input, List, Space, Tabs, message }  from 'antd';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskDetail, setTaskDetail] = useState('');
  const [idTask, setIdTask] = useState(0);


  const handleAddNewTask = () => {
    if(!taskDetail) message.error('Your task is empty')
    else {
      setTaskList([...taskList, {
        detail: taskDetail,
        isCompleted: false
      }])
      setTaskDetail('')
  }}

  const handleRemoveTask = (index) => {
    const listTemp = [...taskList]
    listTemp.splice(index, 1)
    setTaskList(listTemp)
  }

  const handleUpdateActiveTask = (item, index) => {
    item.isCompleted = !item.isCompleted
    const listTemp = [...taskList]
    listTemp[index] = item
    setTaskList(listTemp)
  }

  const handleDeleteCompletedTask = () => {
    const listTemp = [...taskList]
    const activeList = listTemp.filter(element => !element.isCompleted )
    setTaskList(activeList)
  }

  
  const TabProps = [
    {
      key: 'all',
      label: `All`,
      children: (<>
        <div style={{textAlign: 'center'}}>
          <Space.Compact>
            <Input required
              placeholder='Add details'
              allowClear
              value={taskDetail}
              onChange={(val) =>  setTaskDetail(val.target.value)}
              onPressEnter={handleAddNewTask}  />
          </Space.Compact>
          <Button onClick={handleAddNewTask} type='primary' style={{marginLeft: '16px'}}>Add</Button>
        </div>
        <div>
          {taskList.length > 0 && (
            taskList.map((item, index) => 
              <List.Item key={`Task ${index}`}>
                <Checkbox onClick={() => handleUpdateActiveTask(item, index)} checked={item.isCompleted}>
                  <p style={{textDecoration: item.isCompleted ? 'line-through': 'none'}}>{item.detail}</p>
                </Checkbox>
              </List.Item>)
          )}
        </div>
      </>)
    },
    {
      key: 'active',
      label: `Active`,
      children: (<>
        <div style={{textAlign: 'center'}}>
          <Space.Compact>
            <Input required
              placeholder='Add details'
              allowClear
              value={taskDetail}
              onChange={(val) =>  setTaskDetail(val.target.value)}
              onPressEnter={handleAddNewTask}  />
          </Space.Compact>
          <Button onClick={handleAddNewTask} type='primary' style={{marginLeft: '16px'}}>Add</Button>
        </div>
        <div>
          {taskList.length > 0 && (
            taskList.filter(element => !element.isCompleted).map((item, index) => 
            <List.Item key={`Task ${index}`}>
              <Checkbox onClick={() => handleUpdateActiveTask(item, index)} checked={item.isCompleted}>
                <p style={{textDecoration: item.isCompleted ? 'line-through': 'none'}}>{item.detail}</p>
              </Checkbox>
            </List.Item>)
          )}
        </div>
      </>)
    },
    {
      key: 'completed',
      label: `Completed`,
      children: (<>
        <div>
          {taskList.length > 0 && (
            taskList.map((item, index) => item.isCompleted && 
            (<div>
              <List.Item key={`Task ${index}`}  style={{display: 'flex', justifyContent: 'space-between'}}>

                  <Checkbox onClick={() => handleUpdateActiveTask(item, index)} checked={item.isCompleted}>
                    <p style={{textDecoration: item.isCompleted ? 'line-through': 'none'}}>{item.detail}</p>
                  </Checkbox>
                  <Button onClick={() => handleRemoveTask(index)}>del</Button>

              </List.Item>
            </div>))
          )}
        </div>
        <div style={{textAlign: 'right'}}>
          <Button onClick={handleDeleteCompletedTask} type='primary'  danger>Delete all</Button>
        </div>
      </>)
    }
  ]

  return (
    <div className='component'>
      <h1 style={{textAlign: 'center'}}>#todo</h1>
      <Tabs defaultActiveKey="All" items={TabProps} centered="true" tabBarGutter={100} />
      <div></div>
    </div>
    
  );
}

export default App;
