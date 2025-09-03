export const features = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
        </svg>
      ),
      title: "Easy Course Creation",
      description: "Upload your content with our intuitive drag-and-drop interface. No technical skills required."
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      ),
      title: "High-Quality Video",
      description: "Stream HD videos with adaptive quality that adjusts to your internet connection automatically."
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
        </svg>
      ),
      title: "Analytics Dashboard",
      description: "Track your course performance with detailed analytics and insights about your learners."
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V14H16V22H8V14H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V14H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
        </svg>
      ),
      title: "Secure Platform",
      description: "Your content is protected with enterprise-grade security and encrypted storage."
    },
    {
      id: 5,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15.88,8.29L10,14.17L8.12,12.29L6.71,13.71L10,17L17.29,9.71L15.88,8.29Z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team available around the clock."
    },
    {
      id: 6,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
        </svg>
      ),
      title: "Global Reach",
      description: "Reach students worldwide with multi-language support and global content delivery network."
    }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with course creation",
    features: [
      "Upload up to 3 courses",
      "Basic video hosting",
      "Community support",
      "Basic analytics",
      "Mobile-friendly player",
      "Course certificates"
    ],
    buttonText: "Get Started Free",
    buttonStyle: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    popular: false
  },
  {
    id: 2,
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Best for professional educators and trainers",
    features: [
      "Unlimited courses",
      "HD video hosting",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Student assessments",
      "Live streaming",
      "Course marketplace listing"
    ],
    buttonText: "Start Pro Trial",
    buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For organizations and large-scale training",
    features: [
      "Everything in Pro",
      "White-label solution",
      "API access",
      "SSO integration",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security",
      "Bulk user management",
      "Custom reporting"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "bg-gray-900 text-white hover:bg-gray-800",
    popular: false
  }
];
