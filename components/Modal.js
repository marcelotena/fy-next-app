import React, { Component, Fragment } from 'react'
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Dialog from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"


class Modal extends Component {

    state = {
        open: false
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { open } = this.state

        return <Fragment>

            <a onClick={this.handleToggle}>{this.props.linkText}</a>

            <Dialog
                open={open}
                onClose={this.handleToggle}
                maxWidth={'md'}
                scroll={'body'}
            >
                <DialogTitle id="scroll-dialog-title">
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span dangerouslySetInnerHTML={{__html: this.props.content}}></span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleToggle} color="primary" variant="contained">
                        {this.props.closetext}
                    </Button>
                </DialogActions>
            </Dialog>

            { /* language=CSS */ }
            <style jsx>{`
                :global(.MuiButton-containedPrimary) {
                    background-color: #4a90e2!important;
                }

                :global(.MuiButton-containedPrimary:hover) {
                    background-color: rgba(0, 118, 255, 0.8)!important;
                }

                :global(.MuiDialogTitle-root) {
                    background-color: #4a90e2;
                    color: white;
                }
            `}</style>

        </Fragment>
    }
}

export default Modal
