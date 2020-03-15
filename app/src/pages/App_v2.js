import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
//import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
var firebaseui = require('firebaseui');

// Get the download URL
var storage="https://storage.cloud.google.com/at-desk-yoga.appspot.com/public/"
  var audioRef ="audio/"
  var imageRef ="img/bg-img/"
     
 

class App_v2 extends Component {
  
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      author:"",
      user: "",

      isSignedIn: false ,// Local signed-in state.
      boards: [], 

      audio: ["Shivasana AM.mp3", "Chin Mudra AM.mp3", "kapalabhati-breath.mp3","Surya Namaskār .mp3" ],
      description: [`Savasana (shah-VAH-sah-nah or shih-VAH-snah)
       Savasana is likely the first Sanskrit word learned by yoga students,
        and it often quickly becomes their favourite. It brings with it images of calmness, 
        rest and relaxation, of drifting away, and sometimes even napping, as a 
        well-exercised body and relaxed mind settle into the mat at the end of a practice.`,
        `Vishnu mudra. Anne-Marie Bouin
        Certain pranayama techniques call for breathing
         through one nostril at a time, with the other nostril lightly held closed. Traditionally, one closes the nostrils using a special hand position called Vishnu Mudra (Symbol of Vishnu), 
         as illustrated below.
`,
      `Kapalabhati, also called breath of fire, is an important Shatkarma, 
      a purification in hatha yoga. The word kapalabhati is made up of two Sanskrit words:
       kapāla meaning 'skull', and bhāti meaning 'shining, illuminating'. 
      One should know how to do Kapalabhati Pranayama in a proper manner`,
     
      `Surya Namaskar, Salute to the Sun or Sun Salutation, is a practice in yoga as exercise incorporating a sequence of some twelve gracefully linked asanas. The asana sequence was first recorded as yoga in the early 20th century, 
      though similar exercises were in use in India before that, for example among wrestlers`],

      title: ["Shavasana", "Vishnu mudra. Anne-Marie Bouin", "Kapalabhati", "Surya Namaskār. Sun Salutation"],
      author: ["Anne-Marie Bouin", "Anne-Marie Bouin", "Anne-Marie Bouin", "Anne-Marie Bouin"],
      image:["sv.png", "vm.png", "kb.png", "sans.gif"],
      user: {}, 
      
       carole:["Relax.mp3", "Breath.mp3", "Eyes.mp3", "Neck.mp3", "Sholders.mp3", "hands.mp3", "SalutationSoleil.mp3"]
    };
  }
  

// Configure FirebaseUI.
uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, link, featured, rating } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        link,
        featured,
        rating

      });
    });
    this.setState({
      boards
   });
  }


  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
     
  );

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // Initialize the FirebaseUI Widget using Firebase.
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }


createTable = () => {
  let table = []

  // Outer loop to create parent
  for (let i = 0; i < 4; i++) {
    let children = []
        //Inner loop to create children
        for (let j = 0; j < 1; j++) {
       children.push(


          

                  <div class="">
                     <img src ={imageRef+ this.state.image[i]}  alt={storage+imageRef} caption ="" width="450px" />
                  
                      
                              <div class =""> 
                                  
                                  <p>{this.state.title[i]} by {this.state.author[i]} </p>
                                  
                                  <audio controls preload="metadata" class="audio_pl" style={{},{opacity:0.85}}>
                                      <source src={storage+audioRef+ this.state.audio[i]} type="audio/mp3" />
                                      Your browser does not support the audio element.
                                  </audio>
                                  <p> {this.state.description[i]} </p>
                            
                             </div>
                  </div>
        
         
         
       
        
       
       
  )
    }
    //Create the parent and add the children
    table.push(<ul>{children}</ul>)
    }
  return table
}


createCarole=()=>{

  var NewComponent =[]
  
  
    let children = []
    for (let i = 0; i < 7; i++) {  
      children.push(
  
 
        <div className="" data-wow-delay="150ms">
          <div className="">

          <div class="">
            <div class="col-12 col-md-5 col-lg-4">
              <img src={storage+imageRef + "fa.jpg"} alt="" />
            </div>
             <div class="col-12 col-md-7 col-lg-8 "> 
            <div className="content-">
              <h6>{this.state.carole[i]}</h6>
               </div>
           
          </div>
          <audio controls preload="metadata"  style={{opacity:0.78}}>
                            <source src={storage+audioRef+ this.state.carole[i]} type="audio/mp3" />
                            Your browser does not support the audio element.
          </audio>
          <hr />
        </div>
        </div>
        

    </div>  )  
    }
    NewComponent.push(<ul>{children}</ul>)


      return NewComponent;
    }



  render() {

    if (!this.state.isSignedIn) { 

      return (
        <div>
            {this.createTable()}
     
     <div class="card">
       <div class="card-body">
        <div class="col-12 col-lg-12">
            <div class="new-hits-area mb-100">
            <div class="section-heading text-left mb-50 wow fadeInUp" data-wow-delay="50ms">
               
                <h2><p>15 Minutes break with </p>Carole Morency</h2>
                <p>Chair Yoga </p>
            </div>
        {this.createCarole()}
        </div>
      </div>
    </div>
   </div>
  

    <div class="card">
        <div class="card-body">
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div></div>
         
        </div>
      );
    }

    return (
      <div >
      

      
            <div class="col-12 col-lg-12">
                <div class="new-hits-area mb-100">
              <div class="section-heading text-left mb-50 wow fadeInUp" data-wow-delay="50ms">
                  
                  <h2><p>Session with </p>Anne-Marie</h2>
                  <hr></hr>
                  <h6>Sivananda Yoga </h6>
              </div>
              {this.createTable()}
          </div>
     
      </div>
        <div class="card">
          <div class="card-body">
            <div class="col-12 col-lg-12">
                <div class="new-hits-area mb-100">
              <div class="section-heading text-left mb-50 wow fadeInUp" data-wow-delay="50ms">
                  
                  <h2><p>15 Minutes break with </p>Carole Morency</h2>
                  <p>Chair Yoga </p>
              </div>
          {this.createCarole()}
          </div>
        </div>
      </div>
      </div>
     

      <section class="events-area section-padding-100">
        <div class="container">
            <div class="row">
 {this.createTable()}

            </div>
        </div>
      </section>  
     
      </div>
    );
  }
}

export default App_v2;