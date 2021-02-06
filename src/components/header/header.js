import React from 'react';
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        let text = "";
        
        this.onButtonEnter = (e) => {
            if (e.charCode === 13){
                this.props.onTaskAdd(text);
            }
            text += e.key;
        }
      }

      render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" 
                        placeholder = "What needs to be done?" 
                        onKeyPress = {this.onButtonEnter}
                        autoFocus/>
            </header>
        );
    }
}

// const HeaderIld = () => {
    

//     return (
//         <header className="header">
//             <h1>todos</h1>
//             <input className="new-todo" 
//                     placeholder = "What needs to be done?" 
//                     onKeyPress = {this.onKeyPress}
//                     autoFocus/>
//         </header>
//     );
// }; 

// export default Header;