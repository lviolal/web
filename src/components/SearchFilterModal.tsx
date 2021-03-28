import React, { Fragment, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog';
import { TransitionProps } from '@material-ui/core/transitions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SEO from "./seo"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as queries from '../graphql/queries'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GET_SOURCES = gql(queries.sources)

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#212121',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#262626',
    color: 'white'
  },
  textFieldRoot: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
}))

const CaptionCheckbox = withStyles({
  root: {
    color: '#EA7271',
    '&$checked': {
      color: '#EA7271',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const ComicCheckbox = withStyles({
  root: {
    color: '#CDC37C',
    '&$checked': {
      color: '#CDC37C',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const DeviantArtCheckbox = withStyles({
  root: {
    color: '#A5CF87',
    '&$checked': {
      color: '#A5CF87',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const NewsCheckbox = withStyles({
  root: {
    color: '#8B8BBF',
    '&$checked': {
      color: '#8B8BBF',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const NonFictionCheckbox = withStyles({
  root: {
    color: '#FCC282',
    '&$checked': {
      color: '#FCC282',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const StoryCheckbox = withStyles({
  root: {
    color: '#9FC3D1',
    '&$checked': {
      color: '#9FC3D1',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} style={{ backgroundColor: '#212121' }} {...props} />;
});

function splitUp(arr, n) {
  var rest = arr.length % n,
    restUsed = rest,
    partLength = Math.floor(arr.length / n),
    result = [];

  for (var i = 0; i < arr.length; i += partLength) {
    var end = partLength + i,
      add = false;

    if (rest !== 0 && restUsed) {
      end++;
      restUsed--;
      add = true;
    }

    result.push(arr.slice(i, end));

    if (add) {
      i++;
    }
  }

  return result;
}

export default function SearchFilterModal ({ showModal, closeModal }) {
  const classes = useStyles()

  const [sort, setSort] = useState("DESC")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSites, setSelectedSites] = useState([])

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort((event.target as HTMLInputElement).value);
  };

  const handleCategoryToggle = (value: any) => () => {
    const currentIndex = selectedCategories.indexOf(value);
    const newselectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newselectedCategories.push(value);
    } else {
      newselectedCategories.splice(currentIndex, 1);
    }

    var filteredSites = selectedSites.filter((source) => {
      if (selectedCategories.length === 0) {
        return source
      }
      var returnSource
      selectedCategories.forEach((cat) => {
        switch (cat) {
          case "Captions":
            if (source.tag === 'caption') {
              returnSource = source
            }
            break
          case "Comics":
            if (source.tag === 'comic') {
              returnSource = source
            }
            break
          case "Deviant Art":
            if (source.tag === 'deviantart') {
              returnSource = source
            }
            break
          case "News":
            if (source.tag === 'news') {
              returnSource = source
            }
            break
          case "Non Fiction":
            if (source.tag === 'nonfict') {
              returnSource = source
            }
            break
          case "Stories":
            if (source.tag === 'story') {
              returnSource = source
            }
        }
      })
      if (returnSource) {
        return returnSource
      }
    })

    setSelectedSites(filteredSites)
    setSelectedCategories(newselectedCategories);
  }

  const handleToggle = (value: any) => () => {
    const currentIndex = selectedSites.indexOf(value);
    const newChecked = [...selectedSites];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedSites(newChecked);
  }

  const { loading, error, data } = useQuery(GET_SOURCES, {
    fetchPolicy: 'cache-first'
  })

  var splitData
  if (data) {
    splitData = splitUp(data.sources.filter((source) => {
      if (selectedCategories.length === 0) {
        return source
      }
      var returnSource
      selectedCategories.forEach((cat) => {
        switch (cat) {
          case "caption":
            if (source.tag === 'caption') {
              returnSource = source
            }
            break
          case "comic":
            if (source.tag === 'comic') {
              returnSource = source
            }
            break
          case "deviantart":
            if (source.tag === 'deviantart') {
              returnSource = source
            }
            break
          case "news":
            if (source.tag === 'news') {
              returnSource = source
            }
            break
          case "nonfict":
            if (source.tag === 'nonfict') {
              returnSource = source
            }
            break
          case "story":
            if (source.tag === 'story') {
              returnSource = source
            }
        }
      })
      if (returnSource) {
        return returnSource
      }
    }), 3)
  }

  return (
    <Dialog fullScreen PaperProps={{
      style: {
        backgroundColor: "#212121",
      },
    }} open={showModal} onClose={closeModal} TransitionComponent={Transition}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => closeModal()} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Search Options - All are optional
            </Typography>
            <Button autoFocus color="inherit" onClick={() => closeModal({sort: sort, tags: selectedCategories, sources: selectedSites})}>
              Search
            </Button>
          </Toolbar>
        </AppBar>
        <SEO title="TG Search Modal" />
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>
                Sort
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <RadioGroup defaultValue={sort} onChange={handleSortChange}>
                <FormControlLabel
                  value="DESC"
                  control={<Radio/>}
                  label="Newest First"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="ASC"
                  control={<Radio />}
                  label="Oldest First"
                  labelPlacement="end"
                />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Categories
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  {["Captions", "Comics", "Deviant Art"].map((value) => {
                    const labelId = `${value}`;
                    switch (value) {
                      case "Captions":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('caption')}>
                            <ListItemIcon>
                              <CaptionCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('caption') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                      case "Comics":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('comic')}>
                            <ListItemIcon>
                              <ComicCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('comic') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                      case "Deviant Art":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('deviantart')}>
                            <ListItemIcon>
                              <DeviantArtCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('deviantart') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )

                      default:
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle(value)}>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={selectedCategories.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                    }
                  })}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  {["News", "Non Fiction", "Stories"].map((value) => {
                    const labelId = `${value}`;
                    switch (value) {
                      case "News":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('news')}>
                            <ListItemIcon>
                              <NewsCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('news') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                      case "Non Fiction":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('nonfict')}>
                            <ListItemIcon>
                              <NonFictionCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('nonfict') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                      case "Stories":
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle('story')}>
                            <ListItemIcon>
                              <StoryCheckbox
                                edge="start"
                                checked={selectedCategories.indexOf('story') !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                      default:
                        return (
                          <ListItem key={value} role={undefined} dense button onClick={handleCategoryToggle(value)}>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={selectedCategories.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                          </ListItem>
                        )
                    }
                  })}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Websites
              </Typography>
              </Grid>
              {loading ? (
                <Grid container style={{ justifyContent: 'center' }}>
                  <CircularProgress style={{ color: 'white' }} />
                </Grid>
              ) : splitData ? (
                <Fragment >
                  {splitData.map((sources, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <List>
                          {sources.map((value) => {
                            const labelId = `checkbox-list-label-${value.source}`
                            switch (value.tag) {
                              case "caption":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <CaptionCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                              case "comic":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <ComicCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                              case "deviantart":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <DeviantArtCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                              case "news":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <NewsCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                              case "nonfict":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <NonFictionCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                              case "story":
                                return (
                                  <ListItem key={value.source} role={undefined} dense button onClick={handleToggle(value.source)}>
                                    <ListItemIcon>
                                      <StoryCheckbox
                                        edge="start"
                                        checked={selectedSites.indexOf(value.source) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.title} />
                                  </ListItem>
                                )
                            }
                          })}
                        </List>
                      </Grid>
                    )
                  })}
                </Fragment>
              ) : null}
            </Grid>
          </div>
        </Container>
      </div>
    </Dialog>
  )
}
