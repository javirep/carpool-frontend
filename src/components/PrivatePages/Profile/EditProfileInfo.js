import React, { Component } from 'react'
import { withAuth } from '../../../lib/AuthProvider';
import { Link } from "react-router-dom"
import axios from "axios";
import service from "../../../service/service";

class EditProfileInfo extends Component {

    state = {
        name: null,
        lastName: null,
        imagePath: "",
        fileName: "",
        infoSent: false,
        loading: true,
    }

    async componentDidMount() {

        const apiCall = axios.create({
            baseURL: `${process.env.REACT_APP_API_URI}`,
            withCredentials: true
        })

        const user = await apiCall.get("auth/me");

        this.setState({
            name: user.data.name,
            lastName: user.data.lastName,
            infoSent: false,
            loading: false
        })
    }


    updateProfileInfo = async (e) => {
        e.preventDefault()
        const apiCall = axios.create({
            baseURL: `${process.env.REACT_APP_API_URI}`,
            withCredentials: true
        })
        const { name, lastName, imagePath } = this.state

        await apiCall.put("user/edit", ({ name, lastName, imagePath }))

        this.setState({
            infoSent: true
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFileUpload = e => {
        //console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        //        console.dir(e.target)
        uploadData.append("imagePath", e.target.files[0]);

        const fileName = e.target.files[0].name


        service.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    imagePath: response.secure_url,
                    fileName: fileName
                });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }


    render() {

        return (
            <>
                {
                    this.state.loading ?
                        <p>loading...</p>
                        :
                        <div>
                            <form className="form">
                                <div>
                                    <p>Nombre</p>
                                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                                </div>
                                <div>
                                    <p>Apellidos</p>
                                    <input type="text" value={this.state.lastName} name="lastName" onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div>
                                    <input type="file" className="file-input" name="file" id="file" onChange={(e) => this.handleFileUpload(e)} />
                                    <p></p>
                                    <label className="input select-input file-input-label" htmlFor="file">
                                        {
                                            this.state.fileName === "" ?
                                                <><i className="fas fa-upload"></i> Cambiar foto de perfil</>
                                                :
                                                <> {this.state.fileName}</>
                                        }

                                    </label>

                                </div>

                                {!this.state.infoSent ?
                                    <button type="submit" className="button" onClick={(e) => this.updateProfileInfo(e)} > Actualizar Perfil </button>
                                    :
                                    <>
                                        <span>La información de tu perfil ha sido actualizada</span>
                                        <Link to="/userProfile" className="button"> Volver al perfil </Link>
                                    </>
                                }
                            </form>
                        </div>
                }
            </>
        )
    }
}

export default withAuth(EditProfileInfo);