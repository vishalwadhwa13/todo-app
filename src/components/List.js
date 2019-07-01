import React from 'react';
import "./List.css"

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskList: [{
                task: "First task",
                date: new Date(),
                isDone: false
            }],
            inputTask: ""
        }
    }

    addItem(ev) {
        if (ev.key !== "Enter" || ev.shiftKey) return
        if (this.state.inputTask.trim().length === 0) return
        const taskList = this.state.taskList.slice()
        taskList.push({
            isDone: false,
            task: this.state.inputTask.trim(),
            date: new Date()
        })
        this.setState({ taskList, inputTask: "" })
    }

    onChangeText(ev) {
        this.setState({ inputTask: ev.target.value })
    }

    onCheckChange(date) {
        const taskList = this.state.taskList.slice()
        const obj = taskList.find(ob => ob.date.getTime() === date.getTime())
        obj.isDone = !obj.isDone
        this.setState({ taskList }) 
    }

    render() {
        return (
            <div className="list-wrapper">

                <ul className="list" >
                    {
                        this.state.taskList.map(o => (
                            <li className="list-item-wrapper" key={o.date.getTime()}>
                                <div className="list-item">
                                    <div className="list-item__cbox-wrapper">
                                        <input id={"cbox-" + o.date.toUTCString()} 
                                        type="checkbox" 
                                        defaultChecked={o.isDone} 
                                        className="list-item__cbox"
                                        onChange={this.onCheckChange.bind(this, o.date)}></input>
                                    </div>
                                    <div className="list-item__details">
                                        <label htmlFor={"cbox-" + o.date.toUTCString()}>{o.task}</label>
                                        <div className="list-item__date-wrapper">
                                            <small>{o.date.toUTCString()}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className="task-input-wrapper">
                    <textarea
                        rows="4"
                        className="task-input"
                        value={this.state.inputTask}
                        onKeyDown={this.addItem.bind(this)}
                        onChange={this.onChangeText.bind(this)}></textarea>
                </div>

            </div>
        )
    }
}