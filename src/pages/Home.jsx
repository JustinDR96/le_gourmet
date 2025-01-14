import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselImages = [
  {
    url: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
    title: "Une cuisine raffinée",
  },
  {
    url: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg",
    title: "Notre équipe passionnée",
  },
  {
    url: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg",
    title: "Un cadre exceptionnel",
  },
];

const testimonials = [
  {
    name: "Sophie Martin",
    comment:
      "Une expérience gastronomique inoubliable. Les saveurs sont exceptionnelles !",
    role: "Critique Culinaire",
  },
  {
    name: "Pierre Dubois",
    comment:
      "Le service est impeccable et l'ambiance est parfaite pour une soirée romantique.",
    role: "Client Fidèle",
  },
  {
    name: "Marie Laurent",
    comment:
      "Les plats sont une véritable œuvre d'art. Un régal pour les yeux et les papilles !",
    role: "Blogueuse Culinaire",
  },
];

function Home() {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box>
      {/* Carrousel */}
      <Box sx={{ position: "relative" }}>
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <Box key={index} sx={{ position: "relative", height: "70vh" }}>
              <Box
                component="img"
                src={image.url}
                alt={image.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    mb: 4,
                    fontFamily: "Playfair Display",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {image.title}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate("/reservation")}
                  sx={{ fontWeight: "bold" }}
                >
                  Réserver une table
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Section À propos */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontFamily: "Playfair Display" }}
            >
              À propos de nous
            </Typography>
            <Typography variant="body1" paragraph>
              Le Gourmet vous accueille dans un cadre raffiné au cœur de Paris.
              Notre chef étoilé et son équipe passionnée vous proposent une
              cuisine française contemporaine, élaborée à partir des meilleurs
              produits de saison.
            </Typography>
            <Typography variant="body1" paragraph>
              Chaque plat est une création unique, alliant tradition et
              modernité, pour vous offrir une expérience gastronomique
              inoubliable.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate("/menu")}
              sx={{ mt: 2 }}
            >
              Découvrir notre menu
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg"
              alt="Notre cuisine"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Section Témoignages */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontFamily: "Playfair Display", mb: 6 }}
          >
            Ce que disent nos clients
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontStyle: "italic" }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
