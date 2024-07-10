import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DiscordIcon from 'docs/src/icons/DiscordIcon';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import { authors as AUTHORS } from 'docs/src/modules/components/TopLayoutBlog';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { Link } from '@mui/docs/Link';
import generateRssFeed from 'docs/scripts/generateRSSFeed';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';

export const getStaticProps = () => {
  const data = getAllBlogPosts();
  generateRssFeed(data.allBlogPosts);
  return {
    props: data,
  };
};

function PostPreview(props: BlogPost) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
        {props.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
            color="primary"
            sx={(theme) => ({
              height: 22,
              fontWeight: 'medium',
              fontSize: theme.typography.pxToRem(13),
              '& .MuiChip-label': {
                px: '6px',
              },
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.grey[200],
              }),
            })}
          />
        ))}
      </Box>
      <Typography
        component="h2"
        fontWeight="bold"
        variant="subtitle1"
        sx={{
          mb: 0.5,
        }}
      >
        <Link
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}/`}
          sx={{
            color: 'text.primary',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.title}
        </Link>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 'auto' }}>
        {props.description}
      </Typography>
      {props.authors && (
        <AvatarGroup
          sx={[
            (theme) => ({
              mt: 2,
              mb: 1,
              alignSelf: 'flex-start',
              '& .MuiAvatar-circular': {
                width: 28,
                height: 28,
                border: 3,
                borderColor: '#FFF',
                backgroundColor: (theme.vars || theme).palette.grey[100],
                color: (theme.vars || theme).palette.grey[800],
                fontSize: theme.typography.pxToRem(13),
                fontWeight: 500,
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                '& .MuiAvatar-circular': {
                  borderColor: (theme.vars || theme).palette.primaryDark[800],
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  color: (theme.vars || theme).palette.primaryDark[100],
                },
              }),
          ]}
        >
          {(props.authors as Array<keyof typeof AUTHORS>).map((author) => (
            <Avatar
              key={author}
              alt=""
              src={`${AUTHORS[author].avatar}?s=${28}`}
              srcSet={`${AUTHORS[author].avatar}?s=${28 * 2} 2x, ${AUTHORS[author].avatar}?s=${
                28 * 3
              } 3x`}
            />
          ))}
        </AvatarGroup>
      )}
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {props.authors && (
            <Typography variant="body2" fontWeight="medium">
              {props.authors
                .slice(0, 3)
                .map((userId) => {
                  const name = AUTHORS[userId as keyof typeof AUTHORS]?.name;
                  if (name) {
                    if (props.authors && props.authors.length > 1) {
                      // display only firstName
                      return name.split(' ')[0];
                    }
                    return name;
                  }
                  return userId;
                })
                .join(', ')}
              {props.authors.length > 2 && ', and more.'}
            </Typography>
          )}
          {props.date && (
            <Typography variant="caption" fontWeight="regular" color="text.secondary">
              {new Date(props.date).toDateString()}
            </Typography>
          )}
        </Box>
        <Button
          component={Link}
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          id={`describe-${props.slug}`}
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={(theme) => ({
            mt: { xs: 1, md: 0 },
            mb: { xs: -1, md: 0 },
            color: (theme.vars || theme).palette.primary[600],
            '& .MuiButton-endIcon': {
              ml: 0,
            },
            ...theme.applyDarkStyles({
              color: (theme.vars || theme).palette.primary[300],
            }),
          })}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
}

const PAGE_SIZE = 5;

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const postListRef = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);
  const [selectedTags, setSelectedTags] = React.useState<Record<string, boolean>>({});
  const { allBlogPosts, tagInfo: rawTagInfo } = props;
  const [firstPost, secondPost, ...otherPosts] = allBlogPosts;
  const tagInfo = { ...rawTagInfo };
  [firstPost, secondPost].forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagInfo[tag]) {
        tagInfo[tag]! -= 1;
      }
    });
  });
  Object.entries(tagInfo).forEach(([tagName, tagCount]) => {
    if (tagCount === 0) {
      delete tagInfo[tagName];
    }
  });
  const filteredPosts = otherPosts.filter((post) => {
    if (Object.keys(selectedTags).length === 0) {
      return true;
    }

    return post.tags.some((tag) => {
      return Object.keys(selectedTags).includes(tag);
    });
  });
  const pageStart = page * PAGE_SIZE;
  const totalPage = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);
  const getTags = React.useCallback(() => {
    const { tags = '' } = router.query;
    return (typeof tags === 'string' ? tags.split(',') : tags || [])
      .map((str) => str.trim())
      .filter((tag) => !!tag);
  }, [router.query]);

  React.useEffect(() => {
    const arrayTags = getTags();
    const finalTags: Record<string, boolean> = {};
    arrayTags.forEach((tag) => {
      finalTags[tag] = true;
    });
    setSelectedTags(finalTags);
    setPage(0);
  }, [getTags]);

  const removeTag = (tag: string) => {
    router.push(
      {
        query: {
          ...router.query,
          tags: getTags().filter((value) => value !== tag),
        },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Blog - MUI"
        description="Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives."
        card="/static/social-previews/blog-preview.jpg"
        disableAlternateLocale
      />
      <AppHeader />
      <main id="main-content">
        <Section cozy bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline="Blog"
            title={
              <Typography variant="h2" component="h1">
                Stay <GradientText>in the loop</GradientText> with
                <br /> the latest about MUI&apos;s products
              </Typography>
            }
          />
          <Box
            component="ul"
            sx={{
              display: 'grid',
              m: 0,
              p: 0,
              pt: 8,
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[firstPost, secondPost].map((post) => (
              <Paper
                key={post.slug}
                component="li"
                variant="outlined"
                sx={[
                  {
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderColor: 'grey.200',
                    boxShadow: '0px 4px 16px rgba(170, 180, 190, 0.2)',
                    '&:focus-within': {
                      '& a': {
                        outline: 0,
                      },
                    },
                  },
                  (theme) =>
                    theme.applyDarkStyles({
                      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.4)',
                    }),
                ]}
              >
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    sx={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
                <PostPreview {...post} />
              </Paper>
            ))}
          </Box>
        </Section>
        <Divider />
        <Container
          ref={postListRef}
          sx={{
            py: { xs: 4, sm: 6, md: 8 },
            mt: -6,
            display: 'grid',
            gridTemplateColumns: { md: '1fr 380px' },
            columnGap: 8,
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            fontWeight="700"
            sx={{ mb: { xs: 1, sm: 2 }, mt: 8 }} // margin-top makes the title appear when scroll into view
          >
            Posts{' '}
            {Object.keys(selectedTags).length ? (
              <span>
                tagged as{' '}
                <Typography component="span" variant="inherit" color="primary" noWrap>
                  &quot;{Object.keys(selectedTags)[0]}&quot;
                </Typography>
              </span>
            ) : (
              ''
            )}
          </Typography>
          <Box sx={{ gridRow: 'span 2' }}>
            <Box
              sx={(theme) => ({
                position: 'sticky',
                top: 100,
                alignSelf: 'start',
                mb: 2,
                mt: { xs: 3, sm: 2, md: 9 }, // margin-top makes the title appear when scroll into view
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.divider,
                boxShadow: '0px 2px 6px rgba(170, 180, 190, 0.2)',
                ...theme.applyDarkStyles({
                  background: alpha(theme.palette.primaryDark[700], 0.2),
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                }),
              })}
            >
              <Typography color="text.primary" fontWeight="semiBold" sx={{ mb: 2 }}>
                Filter by tag
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {Object.keys(tagInfo).map((tag) => {
                  const selected = !!selectedTags[tag];
                  return (
                    <Chip
                      key={tag}
                      variant={selected ? 'filled' : 'outlined'}
                      color={selected ? 'primary' : undefined}
                      {...(selected
                        ? {
                            label: tag,
                            onDelete: () => {
                              postListRef.current?.scrollIntoView();
                              removeTag(tag);
                            },
                          }
                        : {
                            label: tag,
                            onClick: () => {
                              postListRef.current?.scrollIntoView();
                              router.push(
                                {
                                  query: {
                                    ...router.query,
                                    tags: tag,
                                  },
                                },
                                undefined,
                                { shallow: true },
                              );
                            },
                          })}
                      size="small"
                      sx={{
                        py: 1.2,
                      }}
                    />
                  );
                })}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography color="text.primary" fontWeight="semiBold" gutterBottom>
                Want to hear more from us?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Get up to date with everything MUI-related through our social media:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, '* > svg': { mr: 1 } }}>
                <Link href="https://github.com/mui" target="_blank" fontSize={14}>
                  <GitHubIcon fontSize="small" />
                  GitHub
                </Link>
                <Link href="https://twitter.com/MUI_hq" target="_blank" fontSize={14}>
                  <XIcon fontSize="small" />X
                </Link>
                <Link href="https://mui.com/r/discord/" target="_blank" fontSize={14}>
                  <DiscordIcon fontSize="small" />
                  Discord
                </Link>
                <Link href="https://www.linkedin.com/company/mui/" target="_blank" fontSize={14}>
                  <LinkedInIcon fontSize="small" />
                  LinkedIn
                </Link>
                <Link href="https://www.youtube.com/@MUI_hq" target="_blank" fontSize={14}>
                  <YouTubeIcon fontSize="small" />
                  Youtube
                </Link>
              </Box>
            </Box>
          </Box>
          <div>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {displayedPosts.map((post) => (
                <Box
                  component="li"
                  key={post.slug}
                  sx={() => ({
                    py: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    },
                  })}
                >
                  <PostPreview {...post} />
                </Box>
              ))}
            </Box>
            <Pagination
              page={page + 1}
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => {
                setPage(value - 1);
                postListRef.current?.scrollIntoView();
              }}
              sx={{ mt: 1, mb: 8 }}
            />
          </div>
        </Container>
      </main>
      <Divider />
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
