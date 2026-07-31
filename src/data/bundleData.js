export const bundleData = {
  steps: [
    {
      id: "cameras",
      title: "Choose your cameras",
      type: "products",
      products: [
        {
          id: "wyze-cam-v4",
          name: "Wyze Cam v4",
          description: "The clearest Wyze Cam ever made.",
          learnMoreUrl: "#",
          badge: "Save 22%",
          imageUrl: "../assets/images/Wyze_Cam_V4_01.0001.png",
          variants: [
            {
              id: "white",
              label: "White",
              price: 27.98,
              comparePrice: 35.98,
              color: "#f5f5f5",
              imageUrl: "../assets/images/Wyze_Cam_v4_White.png",
            },
            {
              id: "grey",
              label: "Grey",
              price: 27.98,
              comparePrice: 35.98,
              color: "#9e9e9e",
              imageUrl: "../assets/images/Wyze_Cam_v4_Grey.png",
            },
            {
              id: "black",
              label: "Black",
              price: 27.98,
              comparePrice: 35.98,
              color: "#1a1a1a",
              imageUrl: "../assets/images/Wyze_Cam_v4_Black.png",
            },
          ],
        },
        {
          id: "wyze-cam-pan",
          name: "Wyze Cam Pan v3",
          description: "360° pan and 180° tilt security camera.",
          learnMoreUrl: "#",
          badge: "Save 12%",
          imageUrl: "../assets/images/Wyze_Cam_Pan_v3.png",
          variants: [
            {
              id: "white",
              label: "White",
              price: 34.98,
              comparePrice: 39.98,
              color: "#f5f5f5",
              imageUrl: "../assets/images/Wyze_Cam_Pan_v3_White.png",
            },
            {
              id: "black",
              label: "Black",
              price: 34.98,
              comparePrice: 39.98,
              color: "#1a1a1a",
              imageUrl: "../assets/images/Wyze_Cam_Pan_v3_Black.png",
            },
          ],
        },
        {
          id: "wyze-cam-floodlight",
          name: "Wyze Cam Floodlight v2",
          description:
            "2K floodlight camera with a 160° wide-angle view for your garage.",
          learnMoreUrl: "#",
          badge: "Save 22%",
          imageUrl: "../assets/images/Wyze_Cam_Floodlight_v2.png",
          variants: [
            {
              id: "white",
              label: "White",
              price: 69.98,
              comparePrice: 89.98,
              color: "#f5f5f5",
              imageUrl: "../assets/images/Wyze_Cam_Floodlight_v2_White.png",
            },
            {
              id: "black",
              label: "Black",
              price: 69.98,
              comparePrice: 89.98,
              color: "#1a1a1a",
              imageUrl: "../assets/images/Wyze_Cam_Floodlight_v2_Black.png",
            },
          ],
        },
        {
          id: "wyze-duo-doorbell",
          name: "Wyze Duo Cam Doorbell",
          description: "Two cameras. Two views. Double the porch protection.",
          learnMoreUrl: "#",
          badge: null,
          imageUrl: "../assets/images/Wyze_Duo_Cam_Doorbell.png",
          variants: [
            {
              id: "single",
              label: "Single",
              price: 69.98,
              comparePrice: null,
              color: "#e0e0e0",
            },
          ],
        },
        {
          id: "wyze-battery-cam",
          name: "Wyze Battery Cam Pro",
          description:
            "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
          learnMoreUrl: "#",
          badge: null,
          imageUrl: "../assets/images/Wyze_Battery_Cam_Pro.png",
          variants: [
            {
              id: "white",
              label: "White",
              price: 89.98,
              comparePrice: null,
              color: "#f5f5f5",
              imageUrl: "../assets/images/Wyze_Battery_Cam_Pro_White.png",
            },
            {
              id: "black",
              label: "Black",
              price: 69.98,
              comparePrice: null,
              color: "#1a1a1a",
              imageUrl: "../assets/images/Wyze_Battery_Cam_Pro_Black.png",
            },
          ],
        },
      ],
    },
    {
      id: "plan",
      title: "Choose your plan",
      type: "plan",
      options: [
        {
          id: "cam-unlimited",
          name: "Cam",
          price: 9.99,
          comparePrice: 12.99,
          description: "Unlimited cloud storage for all your cameras.",
        },
      ],
    },
    {
      id: "sensors",
      title: "Choose your sensors",
      type: "products",
      products: [
        {
          id: "motion-sensor",
          name: "Wyze Sense Motion Sensor",
          description: "Detect motion and trigger alerts.",
          learnMoreUrl: "#",
          badge: null,
          imageUrl: "../assets/images/Wyze_Sense_Motion_Sensor.png",
          variants: [
            {
              id: "single",
              label: "Sensor",
              price: 59.98,
              comparePrice: null,
              color: "#e0e0e0",
            },
          ],
        },
        {
          id: "sense-hub",
          name: "Wyze Sense Hub (Required)",
          description: "Central hub for all your Wyze Sense devices.",
          learnMoreUrl: "#",
          badge: "FREE",
          imageUrl: "../assets/images/Wyze_Sense_Hub_Required.png",
          variants: [
            {
              id: "single",
              label: "Hub",
              price: 0,
              comparePrice: 29.92,
              color: "#e0e0e0",
            },
          ],
        },
      ],
    },
    {
      id: "extra",
      title: "Add extra protection",
      type: "products",
      products: [
        {
          id: "microsd",
          name: "Wyze MicroSD Card (256GB)",
          description: "Local storage for continuous recording.",
          learnMoreUrl: "#",
          badge: null,
          imageUrl:
            "../assets/images/Black_256GB_microSD_card_with_the_Wyze_logo_on_it_Includes_Class_10_and_UHS_3_U3_labelling.png",
          variants: [
            {
              id: "single",
              label: "Single",
              price: 41.96,
              comparePrice: null,
              color: "#e0e0e0",
            },
          ],
        },
      ],
    },
  ],
};
