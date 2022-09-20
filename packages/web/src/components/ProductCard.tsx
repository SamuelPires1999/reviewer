import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Reviews } from '@mui/icons-material';

interface CardProps {
  author: string;
  description: string;
  reviewCount: number;
  name: string;
}

export default function ProductCard(props: CardProps) {
  return (
    <Card elevation={12} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
            <Reviews />
          </Avatar>
        }
        title={props.name}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg"
        alt="Placeholder"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography sx={{ mt: '6px' }} variant="body2" color="text.secondary">
          <strong>By: </strong> {props.author}
        </Typography>
        <Typography sx={{ mt: '6px' }} variant="body2" color="text.secondary">
          <strong>Reviews: </strong> {props.reviewCount}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton style={{ flexGrow: 1 }} aria-label="reviews">
          <Typography>Reviews</Typography>
          <ArrowForwardIcon style={{ fontSize: '16', marginLeft: '6' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
