<?php

namespace App\View\Components\shared;

use Illuminate\View\Component;

class meta extends Component
{
    /**
     * title
     *
     * @var string
     */
    public $title;

    /**
     * description
     *
     * @var string
     */
    public $description;

    /**
     * type
     *
     * @var string
     */
    public $type;

    /**
     * siteName
     *
     * @var string
     */
    public $siteName;

    /**
     * locale
     *
     * @var string
     */
    public $locale;

    /**
     * image
     *
     * @var string
     */
    public $image;

    /**
     * url
     *
     * @var string
     */
    public $url;

    /**
     * Create a new component instance.
     *
     * @param  string  $title
     * @param  string  $description
     * @param  string  $type
     * @param  string  $site_name
     * @param  string  $locale
     * @param  string  $image
     * @param  string  $url
     * @return void
     */
    public function __construct($title = null, $description = null, $type = 'website', $siteName = null, $locale = 'ja_JP', $image = null, $url = null)
    {
        $this->title = empty($title) ? config('app.name') : $title;
        $this->description = empty($description) ? config('app.description') : $description;
        $this->type = $type;
        $this->siteName = empty($siteName) ? config('app.name') : $siteName;
        $this->locale = $locale;
        $this->image = empty($image) ? url()->current() . '/images/shared/OGP.png' : $image;
        $this->url = empty($url) ? url()->current() : $url;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.shared.meta');
    }
}
