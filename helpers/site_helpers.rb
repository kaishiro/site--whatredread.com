module SiteHelpers

  def page_title
    title = ""

    if current_page.url == "/"
      title = "What Red Read"
    else
      if data.page.title
        title = data.page.title + " | What Red Read"
      else
        title = "What Red Read"
      end
    end
    title
  end

end
