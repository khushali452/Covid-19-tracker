import React from 'react';
import {Card, CardContent, Typography } from "@material-ui/core";
import "./Infobox.css";
import { prettyPrintStat } from './util';
function Infobox({title, cases,total}) {
    return (
        <Card className="infobox">
            <CardContent >
                
                <Typography className="infoBox__title" color="textSecondary">
                {title}
                </Typography>

                <h2 className="infoBox__cases">{cases}</h2>

                <Typography className="infobox__total">
                    {prettyPrintStat(total)} Total
                </Typography>
                
                
            </CardContent>
            
        </Card>
    )
}

export default Infobox
