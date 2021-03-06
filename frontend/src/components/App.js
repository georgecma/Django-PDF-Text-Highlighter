import React, {Component} from 'react'; 
import {render} from 'react-dom'; 

class App extends Component {
    constructor (props) {
        super(props); 
        this.state = {
            data: [], 
            loaded: false, 
            placeholder: "Loading..."
        };
    }
    
    componentDidMount() {
        fetch('api/image')
        .then(response=> {
            if(response.status > 400) {
                return this.setState(()=>{
                    return {placeholder:"Error: Error"}; 
                });
            }
            return response.json();
        })
        .then(data=> {
            this.setState(() => {
                return {
                    data, 
                    loaded:true
                };
            }); 
        });
    }
    
    render() {
        return (
            <ul>
                {this.state.data.map(image=> {
                    return (
                        <li key={image.id}>
                            <img src={image.image} alt="image"/>  
                        </li>          
                    );
                
                })}
            </ul>
        );
    }
}

export default App;
const container = document.getElementById('app'); 
render(<App />, container); 


