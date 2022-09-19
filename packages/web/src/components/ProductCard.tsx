import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function ProductCard() {
  return (
    <Card elevation={12} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            AN
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="User"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"
        alt="Placeholder"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Very cool product, should I buy it?
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton style={{ flexGrow: 1 }} aria-label="reviews">
          Reviews
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
