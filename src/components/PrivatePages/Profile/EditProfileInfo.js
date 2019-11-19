import React, { Component } from 'react'
import { withAuth } from '../../../lib/AuthProvider';
import axios from "axios";
import service from "../../../service/service";

class EditProfileInfo extends Component {

    state = {
        name: this.props.user.name,
        lastName: this.props.user.lastName,
        imagePath: null
    }

    updateProfileInfo = async () => {
        const apiCall = axios.create({
            baseURL: `${process.env.REACT_APP_API_URI}`,
            withCredentials: true
        })
        const { name, lastName, imagePath } = this.state

        const user = await apiCall.put("user/edit", ({ name, lastName, imagePath }))

        this.setState({
            user: user.data
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        uploadData.append("imagePath", e.target.files[0]);

        service.handleUpload(uploadData)
            .then(response => {
                this.setState({ imagePath: response.secure_url });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }


    render() {

        return (
            <div>
                <form>
                    <label>Name: </label>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    <label>Last Name: </label>
                    <input type="text" value={this.state.lastName} name="lastName" onChange={(e) => this.handleChange(e)} />
                    <input type="file" onChange={(e) => this.handleFileUpload(e)} />
                    <input type="submit" onClick={() => this.updateProfileInfo()} />
                </form>
            </div>
        )
    }
}

export default withAuth(EditProfileInfo)