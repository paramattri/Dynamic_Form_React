import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import '../RenderCard.css'
import Form from './Form';

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        position: 'absolute',
        top: theme.spacing(5)
    },
    root: {
        flexGrow: 1
    }
}))

function RenderCard() {

    const [cardConfig, setCardConfig] = useState()
    const [shadow, setShadow] = useState(1)
    const [cardInfo, setCardInfo] = useState({
        category: "",
        product: ""
    })

    const [open, setOpen] = useState(false)

    const onMouseOver = () => setShadow(3)
    const onMouseOut = () => setShadow(1)

    const handleClickOpen = (card) => {
        console.log(card.category, card.product)
        setCardInfo({
            category: card.category,
            product: card.product
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        axios.get("http://localhost:9090/api/categories").then((response) => {
            console.log(response.data)
            setCardConfig(response.data)
        })
    }, [])

    const classes = useStyles()

    const renderCard = (card, index) => {
        return (
            <Grid item xs={12} sm={4}>
                <Card key={index} style={{maxWidth: 345, margin: 'auto', marginTop: 20}} onMouseOver={onMouseOver} onMouseOut={onMouseOut} zDepth={shadow}>
                    <CardActionArea onClick={() => handleClickOpen(card)}>
                        <CardMedia component="img" image={card.image} height="140" title={card.category}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {card.category}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }

    return (
        <div className={`cardRender ${classes.root1}`}>
            <Grid container spacing={3}>
                {typeof cardConfig !== 'undefined' && cardConfig.map(renderCard)}
            </Grid>
            {cardInfo.category !== '' && 
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true} classes = {{paper : classes.dialogWrapper}}>
                    <DialogTitle>
                        <div className="dialogTitle">
                            <div className="dialogTitle__close">
                                <CloseIcon onClick={handleClose}/>
                            </div>
                            <div className="dialogTitle__description">
                                <Typography component="h3" variant="h5">
                                    {cardInfo.product}
                                </Typography>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Form cardInfo={cardInfo} setOpenPopup={setOpen}/>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

export default RenderCard
