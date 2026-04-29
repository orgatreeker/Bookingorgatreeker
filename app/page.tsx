export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12">
        
        {/* Tagline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-pretty">
            Your financial clarity starts here
          </h1>
          <p className="text-lg text-foreground/70 font-light">
            Master the 50/30/20 budgeting method instantly
          </p>
        </div>

        {/* Video Container */}
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-secondary shadow-lg">
          <iframe
            src="https://player.vimeo.com/video/1186519212?h=237a8200c1"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            title="50/30/20 Budgeting Sheet Preview"
            className="w-full h-full"
          />
        </div>

        {/* CTA Button */}
        <a
          href="https://superprofile.bio/vp/orgatreeker"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-primary text-background rounded-full font-medium hover:opacity-90 transition-opacity duration-200"
        >
          Get the Sheet Now
        </a>

      </div>
    </main>
  )
}
