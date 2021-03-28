import React, {Fragment} from 'react'
import Container from '@material-ui/core/Container'
import OTGCSponsorBanner from './Ads/OTGCSponsorBanner'
import RoanyerSponsorBannerTop from './Ads/RoanyerSponsorBannerTop'
import FoxxSponsorBanner from './Ads/FoxxSponsorBanner'

export default function TopAdvertisement() {
  return (
    <Fragment>
      <Container maxWidth="md">
        <OTGCSponsorBanner/>
        <RoanyerSponsorBannerTop/>
        <FoxxSponsorBanner/>
      </Container>
    </Fragment>
  );
}