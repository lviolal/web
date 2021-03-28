import React, {Fragment} from 'react'
import Container from '@material-ui/core/Container'
import RoanyerSponsorBannerBottom from './Ads/RoanyerSponsorBannerBottom'

export default function BottomAdvertisement() {
  return (
    <Fragment>
      <Container maxWidth="md" style={{marginTop: 30}}>
        <RoanyerSponsorBannerBottom/>
      </Container>
    </Fragment>
  );
}