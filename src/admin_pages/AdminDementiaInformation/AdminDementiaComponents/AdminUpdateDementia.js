/// summary
///   In development - admin page where the admin can create, delete, edit features fpr CommunityResources Page.
/// summary

// import React, { Component } from 'react';
import React, {useState, useEffect } from 'react';
import styled from 'styled-components'

// components
import  firebase from '../../../shared_comps/firebase';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'

//css
import '../../../css/admin.css'


function AdminAddCommunity() {

    // Data pulled from server
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [website, setWebsite] = useState('');

    const [titleList, setTitleList] = useState([]);

    const [articleKey, setArticleKey] = useState('');
    const [articleList, setArticleList] = useState([]);

     // Onload fill titleList and articleList
    useEffect(() => {
        const database = firebase.database()
        const rootRef = database.ref("Article/");
        rootRef.on('value', snap => {
                    snap.forEach(function(childSnapshot) {
                        setArticleList(articleList => [...articleList, childSnapshot.key]);
                        setTitleList(titleList => [...titleList, childSnapshot.child("title").val()]);
                });
            });
    }, [])

    // Pulls the requested data
    useEffect(() => {
        const database = firebase.database()
        const rootRef = database.ref("Article/" + articleKey);
        rootRef.on('value', snap => {
                setTitle(snap.child("title").val());
                setPicture(snap.child("pic").val());
                setDescription(snap.child("disc").val());
                setWebsite(snap.child("website").val());
            });
    }, [articleKey])

    // Pulls all the article titles
    const DropdownCity = ({ nameList }) => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className="dropdown-button">Pick an article</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                    {nameList.map((title, index) => (
                        <Dropdown.Item onClick={() => {setTitle(title); setArticleKey(articleList[index])}} key={index}>{title}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }



 ///////////////////////////////////////////////////////////////////////////////////////
   
   // HTML
   return (
      <div className="admin-community">
 
         <StyleCommunityContainer>
            
                {/* Drop down to pick citys */}
                <Form className="admin-form">
                    
                    <Table striped bordered hover className="state-city-dropdown-table">
                        <thead>
                            <tr>
                                <th>
                                    <DropdownCity nameList={titleList}/>
                                </th>
                            </tr>
                        </thead>
                    </Table>


                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" id="title"  defaultValue={title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="name" id="description" defaultValue={description}  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Picture URL</Form.Label>
                        <Form.Control type="name" id="pic" defaultValue={picture}  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website URL</Form.Label>
                        <Form.Control type="name" id="website" defaultValue={website} />
                    </Form.Group>
                    
                    <Button onClick={() => update_button(articleKey)} variant="primary" type="submit" className="submit">Update</Button>
               </Form>
         </StyleCommunityContainer>
      </div>
   );
 }
 export default AdminAddCommunity;


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
   <a href="/" ref={ref} onClick={(e) => {e.preventDefault();onClick(e);}}>
      <div id="title">{children}</div>
   </a>
   ));
CustomToggle.propTypes = 
{
   // fixing prop type erros but idk how too yet 
   // children: Array,
   // onClick, I don't know what type this is 
}
CustomToggle.displayName="CustomDropdownToggle";



function update_button(articleKey){ 

    if( document.getElementById("title").value && 
        document.getElementById("description").value &&
        document.getElementById("pic").value &&
        document.getElementById("website").value)
    {
        // var key=firebase.database().ref('Article').push().key;
        firebase.database().ref('Article/'+articleKey).set({
            title:      document.getElementById("title").value,
            disc:       document.getElementById("description").value,
            pic:        document.getElementById("pic").value,
            website:    document.getElementById("website").value,
        },function(error){
            if(error){
            window.alert("failed");
            }else{
            window.alert("yes");
            window.location.reload(false);
            }
        });
    }
    else
    {
        window.alert("failed. Make sure all fields are full");
    }

}



// 'style-component package used for infile css'
const StyleCommunityContainer = styled.nav`
 

 
 `;
 