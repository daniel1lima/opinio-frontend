class AIResponseTool {
  static get toolbox() {
    return {
      title: "AI Response",
      icon: `<svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>ai</title>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="icon" fill="#000000" transform="translate(64.000000, 64.000000)">
                                <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                    </svg>`, // Updated icon
    };
  }

  constructor({ data }) {
    this.data = data || { response: "" }; // Initialize with existing data
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.innerHTML = `
            <textarea placeholder="Type your prompt here..." style="width: 100%; height: 100px; border: 1px solid #ccc; border-radius: 4px; padding: 10px; font-size: 16px; font-family: 'Open Sans', sans-serif;"></textarea>
            <button type="button" class="generate-response" style="margin-top: 10px; padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-family: 'Open Sans', sans-serif;">Generate Response</button>
            <div class="ai-response" style="margin-top: 10px;"></div>
        `;

    this.wrapper
      .querySelector(".generate-response")
      .addEventListener("click", () => {
        const prompt = this.wrapper.querySelector("textarea").value;
        this.generateAIResponse(prompt);
      });

    return this.wrapper;
  }

  async generateAIResponse(prompt) {
    // Replace with your AI API call
    const response = await fetch("YOUR_AI_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    const aiResponse = data.response; // Get the AI response

    // Update the displayed response
    this.wrapper.querySelector(".ai-response").innerText = aiResponse;

    // Update the internal data to be saved
    this.data.response = aiResponse; // Store the response in the data object
  }

  save() {
    return this.data; // Return the data to be saved in Editor.js
  }
}

export default AIResponseTool;
