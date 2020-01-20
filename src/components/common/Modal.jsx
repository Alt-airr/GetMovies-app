import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function Modal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const recommendations = props.recommendations;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Подробнее
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{props.info.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Дата релиза : {props.info.release_date} </p>
                        <p>Оригинальное название : {props.info.original_title} </p>
                        <p>Бюджет : {props.info.budget} </p>
                        <p>Описание : </p>
                        {props.info.overview}
                        <p>Также рекомендуем : </p>
                        {recommendations}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}