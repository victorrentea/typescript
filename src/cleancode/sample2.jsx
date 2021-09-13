import {useStyles} from './style'
import React, {useEffect, useState} from 'react'
import {ReactComponent as CheckMark} from '../../assets/images/icons/checkMark-icon.svg'
import {ReactComponent as Warning} from '../../assets/images/icons/warning-icon.svg'
import {ReactComponent as InfoImg} from '../../assets/images/info.svg'
import {ReactComponent as BanIco} from '../../assets/images/icons/ban.svg'
import {customerServices} from '../../utils'
import {Grid, IconButton, Typography, Box} from '@material-ui/core'
import {navigate} from '@reach/router'
import ButtonWithIcon from '../ButtonWithIcon'
import {useDeviceDetect} from '../../utils'
import {formateDateTime} from '../../utils/formatDate'
import {textHandler} from '../../utils/textHandler'

const OutageComponent = (state) => {
    const {outageData} = state || {};
    const classes = useStyles()
    const [outageInfo, setOutageInfo] = useState([])
    const [generalAffectedStatus, setGeneralAffectedStatus] = useState(false)
    const [isNotfoundStatus, setIsNotfoundStatus] = useState(false)
    const {isMobile} = useDeviceDetect()


    useEffect(() => {
        if (outageData && outageData.data.length && outageData.statusCode) {
            switch (outageData.statusCode) {
                case 200:
                    if (outageData.data.length) {
                        setGeneralAffectedStatus(outageData.data.map(el => el = el.affectedService).every(el => el === true))
                        setOutageInfo(outageData.data)
                    } else {
                        setGeneralAffectedStatus(true)
                        setIsNotfoundStatus(true)
                    }
                    break;
                case 404:
                    setIsNotfoundStatus(true)
                    break;

                default:
                    if (outageData.statusCode !== 401) {
                        navigate('/server-error')
                    }
                    break;
            }
        }
    }, [outageData])


    const iconsHandler = (icoType) => {
        switch (icoType) {
            case 'warning':
               return  <Warning/>
            case 'checkMark':
               return  <CheckMark/>
            case 'info':
               return  <InfoImg/>
            case 'ban':
               return  <BanIco/>
            default: {
                return customerServices
                    .filter(element => element.type === icoType)
                    .map(element => (
                            <IconButton
                                key={element}
                                className={classes.familyIcon}
                                disabled
                                aria-label="add to favorites"
                            >
                                {element.img}
                            </IconButton>
                        )
                )[0]
            }
        }

    }

    const cardBuilder = (item) => {
        const isAffected = item.affectedService
        return (
            <Box key={item} className={classes.contentBox}>
                <Grid justify="space-between" container alignItems="center">
                    <Box display="flex" alignItems="center">
                        {iconsHandler(item.family)}
                        <Grid>
                            <Typography className={classes.cardTitle}>{textHandler(item.family)}</Typography>
                        </Grid>
                    </Box>
                    {iconsHandler(isAffected ? 'warning' : 'checkMark')}
                </Grid>
                <hr/>
                <Typography
                    className={classes.serviceStatus}
                    style={isAffected ? {color: 'red'} : null}>
                    {isAffected ? 'Serviciu momentan indisponibil' : 'Serviciu activ'}
                </Typography>
                <hr/>
                <Grid justify="space-between" container>
                    {
                        isAffected ?
                            <Typography className={classes.serviceStatus}>Estimare realibilitare serviciu: <span
                                style={{color: 'red'}}>{formateDateTime(item)}</span></Typography>
                            :
                            <React.Fragment>
                                <Typography className={classes.paragraph}>Dacă aveți probleme de funcționare a acestui
                                    serviciu încercați soluțiile noastre de rezolvare</Typography>
                                <ButtonWithIcon
                                    fullWidth={isMobile}
                                    className={classes.assistanceBtn}
                                    onClick={() => window.open("https://www.vodafone.ro/personal/asistenta/tv-si-fix/index.htm", "_blank")}>
                                    Asistență
                                </ButtonWithIcon>
                            </React.Fragment>
                    }
                </Grid>
            </Box>
        )
    }


    return (
        <Grid container direction="column" display="flex">
            <Typography variant="h2" className={classes.pageTitle}>
                Disponibilitate Servicii
                <Typography className={classes.pageSubtitle}><b>Serviciile tale: </b> lorem ipsum dolor</Typography>
            </Typography>
            {
                outageInfo.length > 0 &&
                outageInfo.map(el => cardBuilder(el))
            }

            {
                isNotfoundStatus &&
                <Box className={classes.contentBox}>
                    <Grid justify="space-between" container>
                        <Box display="flex" alignItems="center">
                            {iconsHandler('ban')}
                            <Grid style={{marginLeft: '10px'}}>
                                <Typography className={classes.cardTitle}>Toate serviciile tale sunt
                                    funcționale</Typography>
                            </Grid>
                        </Box>
                        {iconsHandler('checkMark')}
                    </Grid>
                </Box>
            }
            {
                generalAffectedStatus || isNotfoundStatus ?
                    <Grid container justify="space-between" className={classes.assistanceCard}>
                        <Typography className={classes.paragraph}>Dacă aveți probleme de funcționare cu oricare alt
                            serviciu încercați soluțiile noastre de rezolvare</Typography>
                        <ButtonWithIcon
                            fullWidth={isMobile}
                            className={classes.assistanceBtn}
                            onClick={() => window.open("https://www.vodafone.ro/personal/asistenta/tv-si-fix/index.htm", "_blank")}>
                            Asistență
                        </ButtonWithIcon>
                    </Grid>
                    : null
            }
        </Grid>
    )
}

export default OutageComponent