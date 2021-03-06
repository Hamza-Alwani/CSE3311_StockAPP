/// summary
///
///	Outreach 
///   - Compiles the Outreach page based on the components entered in below
///
/// summary

import React from 'react';

// components
import Nav from '../shared_comps/NavigationBar';
import DisplayOutreach from '../components/OutreachComponents/DisplayOutreach';
import Footer from '../shared_comps/Footer';

//css
import '../css/main.css'


function Outreach (){
      return(
         <div className="all-content">
            {/* Components */}
            <Nav></Nav>
            {/* <OutreachComponent></OutreachComponent> */}
            <DisplayOutreach></DisplayOutreach>
            <Footer></Footer>
     </div>
   );
}    


export default Outreach