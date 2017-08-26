import React, { Component, PropTypes } from 'react';
import Pros from './Pros';
import Cons from './Cons';


const pros = [
{
	id: 0,
	value: 'pros1'
},
{
	id: 1,
	value: 'pros2'
}
]

const cons = [
{
	id: 0,
	value: 'cons1'
},
{
	id: 1,
	value: 'cons2'
}
]



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pros,
			cons
		};

	}

	/***Pros***/
	updateList (text) {
		let updatePros = this.state.pros;
		updatePros.push(text);
		this.setState({pros: updatePros});
	}

	removeItem(el){
	let updatePros = this.state.pros;
	 if (updatePros.indexOf(el) > -1) {
    	updatePros.splice(updatePros.indexOf(el), 1);
      let i;
      updatePros.map((item, index) => {
      	for(let key of updatePros) {
      		item.id = key;		
      	}
      	});

      this.setState({pros: updatePros});
     
      }
	}
	
   handleChange = (el) => {
	  let item = {
      id: el.target.id,
      value: el.target.value
      };
      let pros = this.state.pros.slice();
      let newPros = pros.map(function(pro) {      
      	for (let key in pro) {
	      if (pro.id == item.id) {
	        	pro.value = item.value
	      }
    }
    return pro;
    });
    this.setState({pros:newPros});
}

	/***Cons***/
	handleConsChange = (el) => {
		  let item = {
	      id: el.target.id,
	      value: el.target.value
	      };
	      let cons = this.state.cons.slice();
	      let newCons = cons.map(function(con) {

	      for (let key in con) {
		      if (con.id == item.id) {
		        	con.value = item.value
		      }
	       }
	    return con;
	     });

	    this.setState({cons:newCons});
	}


	updateConsList = (text) => {
		let updateCons = this.state.cons;
		updateCons.push(text);
		this.setState({Cons: updateCons});
	}

	removeConsItem = (el) => {
	let updateCons = this.state.cons;
	 if (updateCons.indexOf(el) > -1) {
    	updateCons.splice(updateCons.indexOf(el), 1);
    	console.log()
      let i;
      updateCons.map((item, index) => {
      	for(let key of updateCons) {
      		item.id = key;
      	}
      	});
       this.setState({cons: updateCons});
      }
	
	}


	handleConsUpdate = (evt) => {
	  let item = {
      id: evt.target.id,
      value: evt.target.value
      };
      let cons = this.state.cons.slice();
      let newCons = cons.map(function(con) {

      for (let key in con) {
      if (key == item.value && con.id == item.id) {
        con[key] = item.value;

      }
    }
    return con;
  	});
    this.setState({cons:newCons});
	}

	render() {
		let id = this.props.id;
		return (
		  <div className='flex_container'>
	        <div className="title_container">Title</div>
	        <Pros pros={this.state.pros}  updateList = {this.updateList.bind(this)}   handleChange={this.handleChange}  remove={this.removeItem.bind(this)}/>
	        <Cons cons={this.state.cons}  updateConsList = {this.updateConsList.bind(this)} handleConsChange={this.handleConsChange.bind(this)} remove={this.removeConsItem.bind(this)}/>    
	      </div>
			);
	}
}

App.propTypes = {
	pros: PropTypes.arrayOf(PropTypes.object),
	cons: PropTypes.arrayOf(PropTypes.object),
	id: PropTypes.number,
	value: PropTypes.string,
};


