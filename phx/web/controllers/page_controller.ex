defmodule Phx.PageController do
  use Phx.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
