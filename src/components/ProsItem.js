import React, { Component, PropTypes } from 'react';

let dragVal;

export default class ProsItem extends Component {
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
	    let data = this.props.pros;
	    this.over = e.target.parentNode.getAttribute('data-id');
	    let start = Number(this.dragged.dataset.id);
	    let end = Number(this.over);
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
            className='list_item_container'> 	
                <label htmlFor={el.id}>{index + 1}.</label>
                <input className='show_list_inp' value={el.value} key={el.id} id={el.id}  readOnly={!this.state.isEditable} onChange={(el) => this.props.handleChange(el)} onKeyPress={(e) => this.handleKeyPress(e)}></input>
                <button type='button' onClick = {(el)=>this.setState({isEditable: !this.state.isEditable})}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                <button type='button' onClick = {(el)=>this.setState({isEditable: false})}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
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


ProsItem.propTypes = {
    pros: PropTypes.arrayOf(PropTypes.object),
    updateList: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    isEditable: PropTypes.bool
};