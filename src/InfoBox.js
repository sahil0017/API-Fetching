import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

const InfoBox = ({ title , cases , total }) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/** Title */}
                <Typography color="textSecondary" className="infoBox__title">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                {/** No of cases */}
                 <Typography color="textSecondary" className="infoBox__total">
                     {total}
                 </Typography>
                {/** Total */}
            </CardContent>
        </Card>
    )
}

export default InfoBox
