import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';
import CountUp from 'react-countup';

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <Card className= {`infoBox ${active ? 'info--selected' : ''} ${isRed && active ? 'info--red' : ''}`} onClick={props.onClick}>
            <CardContent>
                <Typography color='textSecondary' className='infoBox__title'>
                    {title}
                </Typography>

                <Typography >
                    <h2 className={`infoBox__cases ${!isRed ? 'infoBox__cases--green' : ''} `}>Today: {cases}</h2>
                </Typography>

                <Typography color='textSecondary' className='infoBox__total'>
                   Total: {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;