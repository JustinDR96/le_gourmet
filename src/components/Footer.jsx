import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Playfair Display" }}
            >
              Le Gourmet
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Une expérience gastronomique unique au cœur de la ville.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                color="inherit"
                aria-label="Facebook"
                component="a"
                href="#"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                component="a"
                href="#"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Twitter"
                component="a"
                href="#"
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Playfair Display" }}
            >
              Horaires d'ouverture
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                Lundi - Vendredi: 12h00 - 14h30, 19h00 - 22h30
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 3.5 }}>
              Samedi - Dimanche: 12h00 - 23h00
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Playfair Display" }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 Rue de la Gastronomie, 75001 Paris
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Link href="tel:+33123456789" color="inherit" underline="hover">
                +33 1 23 45 67 89
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Link
                href="mailto:contact@legourmet.fr"
                color="inherit"
                underline="hover"
              >
                contact@legourmet.fr
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          © {new Date().getFullYear()} Le Gourmet. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
