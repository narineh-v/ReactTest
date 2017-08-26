import React, { Component, PropTypes } from 'react';
import ProsItem from './ProsItem';



export default class Pros extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            ...props
        }
    }

    showAddInput = () => {
        return (
             <form onSubmit = {event => this.addItem(event)}>
                <input className='add_input' type='text'/>
                <button>+</button>
             </form>
            )
    }

    addItem = (event) => {
        event.preventDefault();
        let input = event.target.querySelector('input');
        let value = input.value;
        let id;
        let it;
        this.props.pros.map((item, index) => {
           item.id = index;
           id = item.id + 1;
        }); 
        it = {
          id: id,
          value: value,
        }
        if(value!= '' && value!= ' '){
        this.props.updateList(it);
        event.target.querySelector('input').value = '';    
        }
    }

	render() {
		return (
			<div className="list_container pros_container">
			     <div className='list_container_title pros_title'>Pros</div>
        			<div className='list_inner_container'>
                        <ProsItem 
                            pros = {this.props.pros}  
                            updateList = {this.props.updateList.bind(this)}   
                            handleChange = {this.props.handleChange.bind(this)}  
                            remove = {this.props.remove.bind(this)}
                        />
        			 
        		     {this.showAddInput()}
        			</div>
			 </div>
			    );
	}
}

Pros.propTypes = {
    pros: PropTypes.arrayOf(PropTypes.object),
    updateList: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};