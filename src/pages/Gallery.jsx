import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const galleryItems = [
  {
    img: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg",
    title: "Salle principale",
    category: "Interior",
  },
  {
    img: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
    title: "Notre Chef en action",
    category: "Kitchen",
  },
  {
    img: "https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg",
    title: "Plat signature",
    category: "Food",
  },
  {
    img: "https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg",
    title: "Cave à vin",
    category: "Wine",
  },
  {
    img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    title: "Desserts",
    category: "Food",
  },
  {
    img: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
    title: "Terrasse",
    category: "Interior",
  },
  {
    img: "https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg",
    title: "Bar",
    category: "Interior",
  },
  {
    img: "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg",
    title: "Fruits de mer",
    category: "Food",
  },
  {
    img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
    title: "Salon privé",
    category: "Interior",
  },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Playfair Display", mb: 6 }}
        >
          Notre Galerie
        </Typography>

        <ImageList variant="masonry" cols={isMobile ? 1 : 3} gap={16}>
          {galleryItems.map((item) => (
            <ImageListItem
              key={item.img}
              onClick={() => handleImageClick(item)}
              sx={{
                cursor: "pointer",
                overflow: "hidden",
                "&:hover img": {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Modal
          open={Boolean(selectedImage)}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: -16,
                top: -16,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "background.paper",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Box
                component="img"
                src={selectedImage.img}
                alt={selectedImage.title}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: 24,
                }}
              />
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

export default Gallery;
