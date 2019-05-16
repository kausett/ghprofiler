import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    // {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
    // {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    // {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    // {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
    // {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    // {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    // {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class UserProfile extends Component {
    render() {
        return (
            <div className="githubProfile"
                 style={{display: 'flex', paddingTop: '25px', paddingBottom: '25px', paddingLeft: '20px'}}>
                <p style={{margin: '0', marginRight: '16px'}}>{this.props.dataId+1}.</p>
                <img src={this.props.avatar_url} alt=""
                     style={{width: 'px', height: '75px', marginRight: '16px', borderRadius: '10px'}}/>
                <div>
                    <h4 style={{margin: '0', marginBottom: '5px', fontWeight: 'bold', paddingTop: '10px'}}>{this.props.name}</h4>
                    <p style={{margin: '0', fontStyle: 'italic', color: '#199dd8', fontSize: '14px'}}>{this.props.company !== null ? this.props.company : "Personal Contributor" }</p>
                </div>
            </div>
        );
    }
}

class UserProfileDetails extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                {/*<div className='app-no-content'>*/}
                {/*    <p style={{width: '50%'}}>You don't have any user in your check list.*/}
                {/*        search for a github user and click on add button to add them to your bucket list</p>*/}
                {/*</div>*/}
                {/*App Template*/}
                {/*https://dribbble.com/shots/5363100-A-Influencer-Profile/attachments/1162778*/}


                <div className='gh-profile-content'>
                    <div className='top-content'>
                        <img src="https://avatars0.githubusercontent.com/u/810438?v=4" alt="" style={{height:
                                '150px', width: '150px', borderRadius: '50%', marginLeft:'64px', marginRight:'24px'}}/>

                        <div className='gh-user-details'>
                            <h3 style={{margin: '0', marginBottom: '5px', fontWeight: 'bold', paddingTop: '10px'}}>Name...</h3>
                            <p style={{margin: '0', fontStyle: 'italic', color: '#199dd8', fontSize: '14px'}}>Company...</p>

                        </div>
                    </div>
                    <div className='bottom-content'>
                        Profile cont
                    </div>

                </div>
            </div>
        );
    }
}



class UserProfileContainer extends Component {
    /**
     * This wraps user profile in a container.
     * @returns (<UserProfile />)
     */
    render() {
        return (
            <div style={{color: 'white', width: '450px', display:'block', overflowY:'auto',marginBottom:'10px',
                position: 'relative' }}>
                { (this.props.pData.length) ?
                    this.props.pData.map((profile, index) => <UserProfile key={index} {...profile} dataId={index}/>) :
                    (<div className='app-no-content'>You don't have any user in your check list. search for a github user
                        and click on add button to add them to your bucket list</div>)
                }
            </div>
        );
    }
}


class UserProfileDetailsContainer extends Component {
    /**
     * Encapsulate user profile data details in a container
     * @returns {*}
     */
    render() {
        return (
            <div style={{background: '#26282f', color: 'white', display: 'flex', width: '100%', height: '100%'}}>
                <UserProfileDetails />
            </div>
        );
    }
}

class Form extends Component {

    state = {
        username: ''
    };

    render() {
        const onChange = (event)=> {
            this.setState({username: event.target.value})
        };

        const onSubmit = async (event) => {
            event.preventDefault();
            let url = `https://api.github.com/users/${this.state.username}`;
            const resp = await axios.get(url);
            this.props.onSubmit(resp.data);
            this.setState({username: ''});
        };

        return (
            <form action="#" className="app-gh-form" onSubmit={onSubmit} autoComplete="on">
                <input type="text" placeholder="Search Github Username" id="app-gh-input"
                       value={this.state.username} onChange={onChange} autoComplete="off"/>
                <button type="submit" id="app-gh-addBtn"> Add</button>
            </form>
        );
    }
}


class App extends Component {
    /**
     * Application root encapsulate all part/component of the application.
     * @type {{profile: *[]}}
     */
    state = {
        profile: testData
    };
    render() {
        const  addNewProfile = (profData) => {
            console.log(profData);
           this.setState(prevState => ({
               profile: [...prevState.profile, profData]
           }))
        };

        return <>
            <div className="app-container">
                <a className="app-header" href="/">
                    Github Profile Searcher
                </a>
                <Form onSubmit={addNewProfile} />
            </div>
            <div style={{width: '100vw', height: 'calc(100vh - 77px)', display: 'flex', flexDirection: 'row'}}>
                <UserProfileContainer pData={this.state.profile}/>
                <UserProfileDetailsContainer/>
            </div>
        </>;
    }
}

export default App;
