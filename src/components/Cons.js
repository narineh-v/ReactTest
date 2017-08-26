import React, { Component, PropTypes } from 'react';
import ConsItem from './ConsItem';

let dragVal;

export default class Cons extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            ...props
        }
    }


    showAddInput() {
        return (
             <form onSubmit = {event => this.addItem(event)}>
                <input className='add_input' type='text'/>
                <button>+</button>
             </form>
            )
    }

    addItem(event) {
        event.preventDefault();
        let input = event.target.querySelector('input');
        let value = input.value;
        let id;
        let it;
        this.props.cons.map((item, index) => {
           item.id = index;
           id = item.id + 1;
        }); 
        it = {
          id: id,
          value: value,
        }
        if(value!= '' && value!= ' '){
            this.props.updateConsList(it);
            event.target.querySelector('input').value = '';
        }
     }

	render() {
		return (
			<div className="list_container cons_container">
			    <div className='list_container_title cons_title'>Cons</div>
                    <div className='list_inner_container'>
                        <ConsItem 
                            cons = {this.props.cons}  
                            updateList = {this.props.updateConsList.bind(this)}   
                            handleChange = {this.props.handleConsChange.bind(this)}  
                            remove = {this.props.remove.bind(this)}
                        />
                     
                     {this.showAddInput()}
                    </div>
			 </div>
			    );
	}
}

Cons.propTypes = {
    cons: PropTypes.arrayOf(PropTypes.object),
    updateConsList: PropTypes.func.isRequired,
    handleConsChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};