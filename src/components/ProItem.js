import React from 'react';

var dragVal;

export default class ProItem extends React.Component {
    constructor(props) {
	super(props);
    this.state = {
        isEditable: false,
        ...props
    	}
    }

    dragStart = (e) => {
	    this.dragged = e.currentTarget;
	    e.dataTransfer.effectAllowed = 'move';
	    dragVal = this.dragged.firstElementChild.value;
	    e.dataTransfer.setData(dragVal, e.target.dataset.id);
	    console.log(dragVal);
	}

    dragOver = (e) => {
	    e.preventDefault();
	    var data = this.props.pros;
	    this.over = e.target.parentNode.getAttribute('data-id');
	    var start = Number(this.dragged.dataset.id);
	    var end = Number(this.over);
	    data.splice(end, 0, data.splice(start, 1)[0]);
	    this.setState({pros: data});
    }

    handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.setState({
            isEditable: false
       })
      }
    }

    showPros = () => {
    	return  this.props.pros.map((el,index) => {
    		return (
    		<div 
        	key={index}      
            data-id={index}         
            draggable='true'          
            onDragStart={this.dragStart}
            className='list-item-container'> 
                <input className='show-list-inp' value={el.value} key={el.id} id={el.id}  readOnly={!this.state.isEditable} onChange={(el) => this.props.handleChange(el)} onKeyPress={(e) => this.handleKeyPress(e)}></input>
                <button type='button' onClick = {(el)=>this.setState({isEditable: !this.state.isEditable})}>!</button>
                <button type='button' onClick = {(el)=>this.setState({isEditable: !this.state.isEditable})}>v</button>
                <button type='button' onClick = {this.props.remove.bind(this,el)}>x</button>
            </div>
            )
        });
    }

    render() {
    	return <div onDragOver={this.dragOver}>
    	 {this.showPros()}
    	       </div>;
    }

}