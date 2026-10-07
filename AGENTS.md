<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Bookable services live only in the SERVICES array in src/config/site.ts; booking cards and Cal.com embeds read from it, so prices and slugs change in one place.
- All Airtable calls go through src/lib/airtable.server.ts (base ID, table IDs, typecast writes, rate limit), loaded inside server function handlers only, so the token never reaches the browser.
