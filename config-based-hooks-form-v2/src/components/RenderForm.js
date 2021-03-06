import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography, Switch } from '@material-ui/core';
import '../RenderForm.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function RenderForm({formFields, onSubmit}) {

    var validations
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm()

    const handlePattern = (validation) => {
        let tempValidation = validation
        tempValidation["pattern"]["value"] = new RegExp(validation.pattern.value)
        validations = tempValidation
    }

    const handleValidations = (validation) => {
        validations = validation
    }

    const renderFields = (fields) => {

        return fields.map(field => {
            const { name, type, label, placeholder, validation } = field
            {validation.hasOwnProperty("pattern") ? handlePattern(validation) : handleValidations(validation)}

            switch(type){

                case 'text':
                case 'email':
                case 'tel':
                case 'date':
                case 'number':
                    return (
                        <div key={name}>
                            <TextField id={name} name={name} type={type} label={label} placeholder={placeholder} inputRef={register(validations)}
                                variant="outlined" margin="normal" fullWidth/>
                            {errors[name] && <span style={{color: "red"}}>* {errors[name].message}</span>}
                        </div>
                    )
                
                case 'select':
                    return (
                        <div key={name}>
                            <select id={name} name={name} ref={register(validations)}>
                                <option value="">Select Destination..</option>
                                <option value="India">India</option>
                                <option value="England">England</option>
                                <option value="Australia">Australia</option>
                                <option value="USA">USA</option>
                            </select>
                            {errors[name] && <span style={{color: "red"}}>* {errors[name].message}</span>}  
                        </div> 
                    )
                
                case 'radio':
                    return (
                        <div key={name}>
                            <FormControl component="fieldset" required>
                                <FormLabel component="legend">{label}</FormLabel>
                                <RadioGroup row name={name}>
                                    {field.items.map((item) => {
                                        return <FormControlLabel key={item.value} value={item.value} control={<Radio inputRef={register(validations)}/>} label={item.label} labelPlacement="end"/>
                                    })}
                                </RadioGroup>
                            </FormControl>
                            {errors[name] && <span style={{color: "red"}}>* {errors[name].message}</span>}
                        </div>
                    )

                default:
                    return (
                        <div key={name}>
                            <span style={{color: 'red'}}>Invalid Field</span>
                        </div>
                    )
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs" className="renderForm">
            <div className={classes.paper}>
                <Typography variant="subtitle1">
                    Provide the following details
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    {renderFields(formFields)}
                    <FormControlLabel 
                        control={<Switch name="sendUpdates" inputRef={register}/>}
                        labelPlacement="start"
                        label="Get updates on Email"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default RenderForm
