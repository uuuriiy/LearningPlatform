import { pricingPlans } from "@/utils";

export const PricingSection = () => {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
            All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-500 shadow-xl scale-105' 
                  : 'border-gray-200 shadow-lg hover:shadow-xl'
              } transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.41,10.09L6,11.5L11,16.5Z" />
                      </svg>
                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer custom enterprise solutions for organizations with specific requirements. 
              Get in touch with our sales team to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Schedule a Demo
              </button>
              <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Is there a free trial?
              </h4>
              <p className="text-gray-600">
                All paid plans come with a 14-day free trial. No credit card required to get started.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
